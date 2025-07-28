'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from './components/Sidebar';
import AdminNavbar from './components/Topbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 👇 Skip login check if you're on the login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkLoginStatus = async () => {
      try {
        const res = await fetch('/api/auth/me', { method: 'GET' });
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, [isLoginPage]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 550);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMobile &&
        collapsed &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setCollapsed(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [collapsed, isMobile]);

  const handleCloseSidebar = () => {
    if (isMobile) setCollapsed(false);
  };

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // ✅ Loader
  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  // ✅ If login page → just render the page without navbar/sidebar
  if (isLoginPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  // ✅ If not logged in (but on protected page), redirect is already handled via middleware

    if (!isLoggedIn) {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">🔒 Unauthorized</h1>
      <p className="text-gray-600 mb-6">
        You must be logged in to access this page.
      </p>
      <a
        href="/admin/login"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Login
      </a>
    </div>
  );
}



  return (
    <div className="h-screen flex flex-col relative">
      <AdminNavbar toggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (desktop) */}
        {!isMobile && (
          <div className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
            <AdminSidebar collapsed={collapsed} />
          </div>
        )}

        {/* Sidebar (mobile) */}
        {isMobile && collapsed && (
          <div
            ref={sidebarRef}
            className="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg"
          >
            <AdminSidebar collapsed={false} onLinkClick={handleCloseSidebar} />
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
