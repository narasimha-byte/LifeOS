import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'LifeOS - Personal Life Management System',
  description: 'Complete personal life management system combining daily planning, goals, habits, productivity, journaling, time tracking, and analytics.',
  keywords: 'productivity, planner, goals, habits, journaling, analytics, time tracking',
  authors: [{ name: 'LifeOS Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lifeos.app',
    title: 'LifeOS - Personal Life Management System',
    description: 'Premium personal life management system',
    images: [
      {
        url: 'https://lifeos.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
