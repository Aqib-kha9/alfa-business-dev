import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import LayoutWrapper from '@/app/components/layout/LayoutWrapper'

export const metadata: Metadata = {
  title: {
    default: 'Alfa Business Center',
    template: '%s | Alfa Business Center',
  },
  description: 'Premium coworking and business spaces in Mumbai with modern amenities.',
  keywords: ['coworking', 'business center', 'office space', 'Mumbai', 'Alfa'],
  authors: [{ name: 'Alfa Business Center', url: 'https://yourdomain.com' }],
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: {
    title: 'Alfa Business Center',
    description: 'Explore modern and flexible coworking spaces in Mumbai.',
    url: 'https://yourdomain.com',
    siteName: 'Alfa Business Center',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alfa Business Center',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alfa Business Center',
    description: 'Explore modern and flexible coworking spaces in Mumbai.',
    creator: '@alfabusiness',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Toaster />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}
