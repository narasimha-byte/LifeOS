'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { HabitModal } from '@/components/modals/habit-modal';
import { CheckCircle, Flame, Pencil, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { DEFAULT_USER_ID } from '@/lib/constants';

interface HabitLog {
  id: string;
  habitId: string;
  completedDate: string;
  createdAt: string;
}

interface Habit {
  id: string;
  userId: string;
  name: string;
  streak: number;
  habitLogs: HabitLog[];
  createdAt: string;
  updatedAt: string;
}


export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeHabitId, setActiveHabitId] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const fetchHabits = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/habits?userId=${DEFAULT_USER_ID}`);
      if (!response.ok) throw new Error('Failed to fetch habits');
      const data = await response.json();
      setHabits(data || []);
    } catch (error) {
      console.error(error);
      setHabits([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const openCreateModal = () => {
    setSelectedHabit(null);
    setIsModalOpen(true);
  };

  const openEditModal = (habit: Habit) => {
    setSelectedHabit(habit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedHabit(null);
    setIsModalOpen(false);
  };

  const handleSaveHabit = async (habitData: { id?: string; name: string }) => {
    setIsSubmitting(true);
    try {
      const url = '/api/habits';
      const method = habitData.id ? 'PUT' : 'POST';
      const payload = habitData.id ? habitData : { userId: DEFAULT_USER_ID, name: habitData.name };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Failed to save habit');
      }

      closeModal();
      await fetchHabits();
    } catch (error) {
      console.error(error);
      alert('Unable to save habit.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteHabit = async (habitId: string) => {
    if (!confirm('Are you sure you want to delete this habit?')) return;
    try {
      const response = await fetch(`/api/habits?id=${habitId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete habit');
      await fetchHabits();
    } catch (error) {
      console.error(error);
      alert('Could not delete habit.');
    }
  };

  const handleMarkComplete = async (habitId: string) => {
    setActiveHabitId(habitId);
    try {
      const response = await fetch('/api/habits/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ habitId, completedDate: today }),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Failed to log habit');
      }
      await fetchHabits();
    } catch (error) {
      console.error(error);
      alert('Unable to mark habit complete for today.');
    } finally {
      setActiveHabitId(null);
    }
  };

  const handleDeleteLog = async (logId: string) => {
    if (!confirm('Delete this habit log?')) return;
    try {
      const response = await fetch(`/api/habits/logs?id=${logId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete log');
      await fetchHabits();
    } catch (error) {
      console.error(error);
      alert('Unable to remove habit log.');
    }
  };

  return (
    <main className="min-h-screen pt-24 lg:pl-72 px-6 lg:px-10 pb-10 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Habits</h1>
            <p className="text-muted-foreground">Build healthy routines and track consistency.</p>
          </div>
          <Button onClick={openCreateModal} className="gap-2">
            <Flame className="w-4 h-4" />
            Add Habit
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="glass h-40 animate-pulse" />
            ))}
          </div>
        ) : habits.length === 0 ? (
          <Card className="glass text-center py-14">
            <CardContent className="space-y-4">
              <CardTitle className="text-xl">No habits yet</CardTitle>
              <CardDescription>Create habits and mark them complete every day.</CardDescription>
              <Button onClick={openCreateModal} className="mx-auto gap-2">
                <Flame className="w-4 h-4" />
                Create Habit
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {habits.map((habit) => {
              const completedToday = habit.habitLogs.some((log) => log.completedDate.startsWith(today));

              return (
                <Card key={habit.id} className="glass hover:shadow-md transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <CardTitle className="text-lg">{habit.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Current streak: {habit.streak}</p>
                      </div>
                      <Badge variant={completedToday ? 'default' : 'outline'}>
                        {completedToday ? 'Done Today' : 'Pending'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{habit.habitLogs.length} completions recorded</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleMarkComplete(habit.id)}
                          disabled={completedToday || activeHabitId === habit.id}
                        >
                          {activeHabitId === habit.id ? 'Recording...' : completedToday ? 'Completed Today' : 'Mark Complete'}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => openEditModal(habit)}>
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteHabit(habit.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border p-4 bg-muted">
                      <p className="text-sm font-semibold">Recent log entries</p>
                      {habit.habitLogs.length === 0 ? (
                        <p className="text-sm text-muted-foreground mt-2">No completions yet.</p>
                      ) : (
                        <ul className="space-y-2 mt-3">
                          {habit.habitLogs.slice(0, 7).map((log) => (
                            <li key={log.id} className="flex items-center justify-between gap-2 text-sm">
                              <span>{format(new Date(log.completedDate), 'MMM d, yyyy')}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteLog(log.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>

      <HabitModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveHabit}
        isLoading={isSubmitting}
        initialHabit={selectedHabit ? { id: selectedHabit.id, name: selectedHabit.name } : null}
      />
    </main>
  );
}
