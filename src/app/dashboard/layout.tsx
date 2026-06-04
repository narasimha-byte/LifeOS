'use client';

import React from 'react';
import { Sidebar } from '@/components/common/sidebar';
import { TopBar } from '@/components/common/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      <main className="pt-16 pl-0 lg:pl-64 transition-all">
        <div className="p-4 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
