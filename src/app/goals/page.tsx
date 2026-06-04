'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GoalModal } from '@/components/modals/goal-modal';
import { Trash2, Pencil, Calendar, Plus, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { DEFAULT_USER_ID } from '@/lib/constants';

interface Goal {
  id: string;
  title: string;
  description: string | null;
  targetDate: string | null;
  progress: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  NOT_STARTED: 'bg-gray-500/10 text-gray-500',
  IN_PROGRESS: 'bg-blue-500/10 text-blue-500',
  COMPLETED: 'bg-green-500/10 text-green-500',
  CANCELLED: 'bg-red-500/10 text-red-500',
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/goals?userId=${DEFAULT_USER_ID}`);
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data || []);
    } catch (error) {
      console.error(error);
      setGoals([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const openCreateModal = () => {
    setSelectedGoal(null);
    setIsModalOpen(true);
  };

  const openEditModal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGoal(null);
    setIsModalOpen(false);
  };

  const handleSaveGoal = async (goalData: {
    id?: string;
    title: string;
    description: string;
    targetDate: string;
    progress: number;
    status: string;
  }) => {
    setIsSaving(true);
    try {
      const response = await fetch(goalData.id ? '/api/goals' : '/api/goals', {
        method: goalData.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          goalData.id
            ? { id: goalData.id, ...goalData }
            : {
                userId: DEFAULT_USER_ID,
                ...goalData,
              }
        ),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Unable to save goal');
      }

      closeModal();
      await fetchGoals();
    } catch (error) {
      console.error(error);
      alert('Could not save goal. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm('Delete this goal? This cannot be undone.')) return;

    try {
      const response = await fetch(`/api/goals?id=${goalId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete goal');
      await fetchGoals();
    } catch (error) {
      console.error(error);
      alert('Could not delete goal.');
    }
  };

  const handleUpdateStatus = async (goalId: string, status: string) => {
    try {
      const response = await fetch('/api/goals', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: goalId, status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      await fetchGoals();
    } catch (error) {
      console.error(error);
      alert('Could not update goal status.');
    }
  };

  return (
    <div className="min-h-screen pt-24 lg:pl-72 px-6 lg:px-10 pb-10 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Goals</h1>
            <p className="text-muted-foreground">Track and achieve your personal goals.</p>
          </div>
          <Button onClick={openCreateModal} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Add Goal
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="glass h-40 animate-pulse" />
            ))}
          </div>
        ) : goals.length === 0 ? (
          <Card className="glass text-center py-14">
            <CardContent className="space-y-4">
              <CardTitle className="text-xl">No goals yet</CardTitle>
              <CardDescription>Create your first goal and track progress over time.</CardDescription>
              <Button onClick={openCreateModal} className="mx-auto gap-2">
                <Sparkles className="w-4 h-4" />
                Create First Goal
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="glass overflow-hidden hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <CardDescription>{goal.description || 'No description provided.'}</CardDescription>
                    </div>
                    <Badge className={statusColors[goal.status] ?? 'bg-muted text-foreground'}>
                      {goal.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span className="font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="w-full rounded-full bg-muted h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {goal.targetDate && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Target: {format(new Date(goal.targetDate), 'MMM dd, yyyy')}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => openEditModal(goal)}>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {goal.status !== 'COMPLETED' && (
                      <Button variant="secondary" onClick={() => handleUpdateStatus(goal.id, 'COMPLETED')}>
                        Complete Goal
                      </Button>
                    )}
                    {goal.status === 'COMPLETED' && (
                      <Button onClick={() => handleUpdateStatus(goal.id, 'IN_PROGRESS')}>
                        Reopen Goal
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>

      <GoalModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveGoal}
        isLoading={isSaving}
        initialGoal={selectedGoal ? {
          id: selectedGoal.id,
          title: selectedGoal.title,
          description: selectedGoal.description || '',
          targetDate: selectedGoal.targetDate || '',
          progress: selectedGoal.progress,
          status: selectedGoal.status,
        } : null}
      />
    </div>
  );
}
