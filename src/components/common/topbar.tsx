'use client';

import React, { useState } from 'react';
import { Bell, Clock, Settings, Moon, Sun, Search, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function TopBar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    const html = document.documentElement;
    if (newTheme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-card/80 backdrop-blur-md border-b border-border/40 z-30">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left: Search */}
        <div className="flex-1 flex items-center gap-2">
          {isSearchOpen ? (
            <Input
              placeholder="Search..."
              className="w-full max-w-md"
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex"
            >
              <Search className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Keyboard shortcut hint */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs text-muted-foreground">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          {/* Theme toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="w-4 h-4" />
          </Button>

          {/* User avatar */}
          <Button
            variant="outline"
            size="icon"
            className="w-10 h-10 rounded-full overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
              U
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}
