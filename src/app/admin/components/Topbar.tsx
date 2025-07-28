'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Wallet, PlusCircle, Menu, LayoutDashboard } from 'lucide-react';
import { TiMessage } from 'react-icons/ti';

export default function AdminNavbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/admin/plans', label: 'Pricing Plans', icon: <Wallet size={18} /> },
    { href: '/admin/tour', label: 'Tour Requests', icon: <PlusCircle size={18} /> },
    { href: '/admin/amenities', label: 'Amenities', icon: <Home size={18} /> },
    { href: '/admin/testimonials', label: 'Testimonials', icon: <TiMessage size={18} /> },
  ];

  return (
    <header className="h-16 px-4 flex items-center justify-between bg-white shadow-sm w-full">
      {/* Left Side: Menu + Links */}
      <div className="flex items-center space-x-4 overflow-x-auto scrollbar-hide">
        <button onClick={toggleSidebar} className="text-gray-700 hover:text-[#2d386a] p-2 shrink-0">
          <Menu size={24} />
        </button>

        {/* Responsive horizontal scrollable nav */}
        <nav className="flex gap-2 md:gap-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium shrink-0
                ${pathname.startsWith(item.href)
                  ? 'text-[#2d386a] border-b-2 border-[#2d386a]'
                  : 'text-gray-500 hover:text-[#2d386a]'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
