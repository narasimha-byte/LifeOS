'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TaskModal } from '@/components/modals/task-modal';
import { CheckCircle, Pencil, Trash2, Calendar, Flag } from 'lucide-react';
import { format } from 'date-fns';
import { DEFAULT_USER_ID } from '@/lib/constants';

interface Task {
  id: string;
  userId: string;
  title: string;
  description: string | null;
  priority: string;
  dueDate: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

const priorityStyles: Record<string, string> = {
  LOW: 'bg-green-500/10 text-green-500',
  MEDIUM: 'bg-blue-500/10 text-blue-500',
  HIGH: 'bg-orange-500/10 text-orange-500',
  URGENT: 'bg-red-500/10 text-red-500',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/tasks?userId=${DEFAULT_USER_ID}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data || []);
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = async (taskData: {
    id?: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => {
    setIsSubmitting(true);
    try {
      const method = taskData.id ? 'PUT' : 'POST';
      const payload = taskData.id
        ? taskData
        : { userId: DEFAULT_USER_ID, completed: false, ...taskData };

      const response = await fetch('/api/tasks', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || 'Failed to save task');
      }
      closeModal();
      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert('Unable to save task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (task: Task) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/tasks', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: task.id, completed: !task.completed }),
      });
      if (!response.ok) throw new Error('Failed to update task');
      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert('Unable to update task status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Delete this task?')) return;
    try {
      const response = await fetch(`/api/tasks?id=${taskId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');
      await fetchTasks();
    } catch (error) {
      console.error(error);
      alert('Unable to delete task.');
    }
  };

  return (
    <main className="min-h-screen pt-24 lg:pl-72 px-6 lg:px-10 pb-10 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tasks</h1>
            <p className="text-muted-foreground">Organize your tasks with priority and deadlines.</p>
          </div>
          <Button onClick={openCreateModal} className="gap-2">
            <Flag className="w-4 h-4" />
            Add Task
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="glass h-40 animate-pulse" />
            ))}
          </div>
        ) : tasks.length === 0 ? (
          <Card className="glass text-center py-14">
            <CardContent className="space-y-4">
              <CardTitle className="text-xl">No tasks yet</CardTitle>
              <CardDescription>Add a task and start tracking progress today.</CardDescription>
              <Button onClick={openCreateModal} className="mx-auto gap-2">
                <Flag className="w-4 h-4" />
                Create Task
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className={`glass overflow-hidden transition-all ${task.completed ? 'opacity-80' : 'hover:shadow-md'}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <CardTitle className={`text-lg ${task.completed ? 'line-through' : ''}`}>
                        {task.title}
                      </CardTitle>
                      <CardDescription>{task.description || 'No description provided.'}</CardDescription>
                    </div>
                    <Badge className={priorityStyles[task.priority] || 'bg-muted text-foreground'}>
                      {task.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{task.dueDate ? format(new Date(task.dueDate), 'MMM dd, yyyy') : 'No due date'}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" onClick={() => handleToggleComplete(task)}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {task.completed ? 'Mark Incomplete' : 'Complete'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => openEditModal(task)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteTask(task.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
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

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSaveTask}
        isLoading={isSubmitting}
        initialTask={selectedTask ? {
          id: selectedTask.id,
          title: selectedTask.title,
          description: selectedTask.description || '',
          priority: selectedTask.priority,
          dueDate: selectedTask.dueDate || '',
        } : null}
      />
    </main>
  );
}
