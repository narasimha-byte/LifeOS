'use client';

import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Initialize theme
    const theme = localStorage.getItem('theme') || 'system';
    applyTheme(theme);
  }, []);

  const applyTheme = (theme: string) => {
    const html = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  );
}
