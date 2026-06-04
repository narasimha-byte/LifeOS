'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

interface GoalData {
  id?: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: string;
}

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goal: GoalData) => Promise<void>;
  isLoading?: boolean;
  initialGoal?: GoalData | null;
}

const statusOptions = [
  { value: 'NOT_STARTED', label: 'Not Started' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export function GoalModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  initialGoal = null,
}: GoalModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('NOT_STARTED');

  useEffect(() => {
    if (initialGoal) {
      setTitle(initialGoal.title || '');
      setDescription(initialGoal.description || '');
      setTargetDate(initialGoal.targetDate || '');
      setProgress(initialGoal.progress ?? 0);
      setStatus(initialGoal.status || 'NOT_STARTED');
    } else {
      setTitle('');
      setDescription('');
      setTargetDate('');
      setProgress(0);
      setStatus('NOT_STARTED');
    }
  }, [initialGoal, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Goal title is required.');
      return;
    }

    if (progress < 0 || progress > 100) {
      alert('Progress must be between 0 and 100.');
      return;
    }

    await onSubmit({
      id: initialGoal?.id,
      title: title.trim(),
      description: description.trim(),
      targetDate: targetDate || '',
      progress,
      status,
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
              <CardTitle>{initialGoal ? 'Edit Goal' : 'Create New Goal'}</CardTitle>
              <CardDescription>{initialGoal ? 'Update the goal and progress tracking.' : 'Set a new goal to achieve.'}</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Goal Title *</label>
                <Input
                  placeholder="e.g., Complete my first marathon"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Add details about your goal..."
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Target Date</label>
                <Input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Progress (%)</label>
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <select
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    disabled={isLoading}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? 'Saving...' : initialGoal ? 'Update Goal' : 'Create Goal'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
