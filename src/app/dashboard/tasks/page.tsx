'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, GripHorizontal, Trash2, Edit2, Clock, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';

const statuses = ['Todo', 'In Progress', 'Review', 'Completed'];
const priorities = {
  low: { label: 'Low', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  medium: { label: 'Medium', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  high: { label: 'High', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
  urgent: { label: 'Urgent', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
};

const mockTasks = {
  todo: [
    { id: 1, title: 'Design dashboard mockups', priority: 'high', dueDate: '2025-01-20' },
    { id: 2, title: 'Setup analytics tracking', priority: 'medium', dueDate: '2025-01-25' },
  ],
  'in-progress': [
    { id: 3, title: 'Implement user auth', priority: 'urgent', dueDate: '2025-01-18' },
    { id: 4, title: 'Database schema review', priority: 'high', dueDate: '2025-01-19' },
  ],
  review: [
    { id: 5, title: 'Code review API routes', priority: 'medium', dueDate: '2025-01-17' },
  ],
  completed: [
    { id: 6, title: 'Setup project repo', priority: 'low', dueDate: '2025-01-10' },
    { id: 7, title: 'Create component library', priority: 'medium', dueDate: '2025-01-15' },
  ],
};

export default function Tasks() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Manage your tasks and priorities</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === 'kanban' ? 'default' : 'outline'}
            onClick={() => setView('kanban')}
          >
            Kanban
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            onClick={() => setView('list')}
          >
            List
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </motion.div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statuses.map((status) => (
            <div key={status} className="space-y-3">
              <div className="flex items-center justify-between px-2">
                <h3 className="font-semibold text-sm">{status}</h3>
                <Badge variant="secondary">
                  {Object.values(mockTasks).flat().length}
                </Badge>
              </div>
              <div className="space-y-2 min-h-96">
                {mockTasks[status.toLowerCase().replace(' ', '-') as keyof typeof mockTasks]?.map(
                  (task: any) => (
                    <Card
                      key={task.id}
                      className="glass border-white/20 cursor-move hover:shadow-md transition-all group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <GripHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm font-medium mb-2">{task.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs border',
                              priorities[task.priority as keyof typeof priorities].color
                            )}
                          >
                            <Flag className="w-3 h-3 mr-1" />
                            {priorities[task.priority as keyof typeof priorities].label}
                          </Badge>
                          <Badge variant="secondary" className="text-xs gap-1">
                            <Clock className="w-3 h-3" />
                            {task.dueDate}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* List View */}
      {view === 'list' && (
        <motion.div variants={itemVariants} className="space-y-2">
          {Object.entries(mockTasks)
            .flatMap(([status, tasks]) =>
              tasks.map((task: any) => ({ ...task, status }))
            )
            .sort(
              (a, b) =>
                Object.keys(priorities).indexOf(b.priority) -
                Object.keys(priorities).indexOf(a.priority)
            )
            .map((task: any) => (
              <Card key={task.id} className="glass border-white/20">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {task.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs border',
                          priorities[task.priority as keyof typeof priorities].color
                        )}
                      >
                        {priorities[task.priority as keyof typeof priorities].label}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{task.dueDate}</span>
                    <Button variant="ghost" size="icon">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </motion.div>
      )}
    </motion.div>
  );
}
