'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface PlannerEntry {
  id?: string;
  startTime: string;
  endTime: string;
  activity: string;
}

interface PlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: PlannerEntry) => Promise<void>;
  isLoading?: boolean;
  initialEntry?: PlannerEntry | null;
}

export function PlannerModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialEntry = null,
}: PlannerModalProps) {
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');
  const [activity, setActivity] = useState('');

  useEffect(() => {
    if (initialEntry) {
      setStartTime(initialEntry.startTime);
      setEndTime(initialEntry.endTime);
      setActivity(initialEntry.activity);
    } else {
      setStartTime('08:00');
      setEndTime('09:00');
      setActivity('');
    }
  }, [initialEntry, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activity.trim()) {
      alert('Please enter an activity description.');
      return;
    }

    if (!startTime || !endTime || startTime >= endTime) {
      alert('Please choose a valid start and end time.');
      return;
    }

    await onSubmit({
      id: initialEntry?.id,
      startTime,
      endTime,
      activity: activity.trim(),
    });
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
              <CardTitle>{initialEntry ? 'Edit Timetable Item' : 'Add Timetable Item'}</CardTitle>
              <CardDescription>{initialEntry ? 'Update your daily schedule.' : 'Block out your day with a focus session.'}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time *</label>
                  <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} disabled={isLoading} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Time *</label>
                  <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} disabled={isLoading} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Activity *</label>
                <textarea
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={3}
                  placeholder="e.g., Weekly planning, meetings, deep work"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'Saving...' : initialEntry ? 'Update Item' : 'Create Item'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
