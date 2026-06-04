'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlannerModal } from '@/components/modals/planner-modal';
import { Pencil, Trash2, Calendar, Clock } from 'lucide-react';
import { DEFAULT_USER_ID } from '@/lib/constants';

interface PlannerEntry {
  id: string;
  userId: string;
  startTime: string;
  endTime: string;
  activity: string;
  createdAt: string;
  updatedAt: string;
}


export default function PlannerPage() {
  const [entries, setEntries] = useState<PlannerEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<PlannerEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/timetable?userId=${DEFAULT_USER_ID}`);
      if (!response.ok) throw new Error('Failed to fetch timetable entries');
      const data = await response.json();
      setEntries(data || []);
    } catch (error) {
      console.error(error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const openCreateModal = () => {
    setSelectedEntry(null);
    setIsModalOpen(true);
  };

  const openEditModal = (entry: PlannerEntry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    setIsModalOpen(false);
  };

  const handleSaveEntry = async (entryData: {
    id?: string;
    startTime: string;
    endTime: string;
    activity: string;
  }) => {
    setIsSaving(true);
    try {
      const method = entryData.id ? 'PUT' : 'POST';
      const payload = entryData.id ? entryData : { userId: DEFAULT_USER_ID, ...entryData };

      const response = await fetch('/api/timetable', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Failed to save timetable entry');
      }

      closeModal();
      await fetchEntries();
    } catch (error) {
      console.error(error);
      alert('Unable to save timetable entry.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (!confirm('Delete this schedule item?')) return;

    try {
      const response = await fetch(`/api/timetable?id=${entryId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete timetable item');
      await fetchEntries();
    } catch (error) {
      console.error(error);
      alert('Unable to delete timetable item.');
    }
  };

  return (
    <main className="min-h-screen pt-24 lg:pl-72 px-6 lg:px-10 pb-10 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Daily Planner</h1>
            <p className="text-muted-foreground">Organize your day with the LifeOS planner.</p>
          </div>
          <Button onClick={openCreateModal} className="gap-2">
            <Clock className="w-4 h-4" />
            Add Item
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="glass h-40 animate-pulse" />
            ))}
          </div>
        ) : entries.length === 0 ? (
          <Card className="glass text-center py-14">
            <CardContent className="space-y-4">
              <CardTitle className="text-xl">No schedule items yet</CardTitle>
              <CardDescription>Plan something for today so you can stay on track.</CardDescription>
              <Button onClick={openCreateModal} className="mx-auto gap-2">
                <Clock className="w-4 h-4" />
                Add First Item
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="glass hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-lg">{entry.activity}</CardTitle>
                      <CardDescription>
                        <Calendar className="w-4 h-4 inline-block align-text-bottom mr-1" />
                        {entry.startTime} – {entry.endTime}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditModal(entry)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        <div>
          <Button asChild variant="outline" className="gap-2">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>

      <PlannerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveEntry}
        isLoading={isSaving}
        initialEntry={selectedEntry ? {
          id: selectedEntry.id,
          startTime: selectedEntry.startTime,
          endTime: selectedEntry.endTime,
          activity: selectedEntry.activity,
        } : null}
      />
    </main>
  );
}
