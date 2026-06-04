'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface HabitData {
  id?: string;
  name: string;
}

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (habit: HabitData) => Promise<void>;
  isLoading?: boolean;
  initialHabit?: HabitData | null;
}

export function HabitModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialHabit = null,
}: HabitModalProps) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialHabit) {
      setName(initialHabit.name || '');
    } else {
      setName('');
    }
  }, [initialHabit, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter a habit name');
      return;
    }

    await onSubmit({ id: initialHabit?.id, name: name.trim() });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card className="glass">
          <CardHeader className="flex items-center justify-between pb-3">
            <div>
              <CardTitle>{initialHabit ? 'Edit Habit' : 'Create New Habit'}</CardTitle>
              <CardDescription>{initialHabit ? 'Update your habit name.' : 'Start a new habit today.'}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Habit Name *</label>
                <Input
                  placeholder="e.g., Morning Exercise"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'Saving...' : initialHabit ? 'Update Habit' : 'Create Habit'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
