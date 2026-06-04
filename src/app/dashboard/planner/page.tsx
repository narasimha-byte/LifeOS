'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const hours = Array.from({ length: 24 }, (_, i) => {
  const hour = i % 12 || 12;
  const period = i < 12 ? 'AM' : 'PM';
  return `${hour}:00 ${period}`;
});

const mockSchedule = [
  { hour: 9, title: 'Team Standup', duration: 1, color: 'bg-blue-500' },
  { hour: 10, title: 'Project Work', duration: 2, color: 'bg-purple-500' },
  { hour: 12, title: 'Lunch Break', duration: 1, color: 'bg-green-500' },
  { hour: 13, title: 'Client Meeting', duration: 1, color: 'bg-orange-500' },
  { hour: 14, title: 'Deep Work', duration: 2, color: 'bg-indigo-500' },
];

export default function DailyPlanner() {
  const [schedule, setSchedule] = useState(mockSchedule);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
          <h1 className="text-3xl font-bold">Daily Planner</h1>
          <p className="text-muted-foreground">Monday, January 15, 2025</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Event
        </Button>
      </motion.div>

      {/* Hourly Schedule */}
      <motion.div variants={itemVariants} className="space-y-4">
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Hourly Schedule</CardTitle>
            <CardDescription>Drag and drop to reschedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {hours.map((hour, index) => (
                <div key={hour} className="flex gap-4">
                  <div className="w-20 text-sm font-medium text-muted-foreground pt-3">
                    {hour}
                  </div>
                  <div className="flex-1 space-y-1">
                    {schedule
                      .filter((s) => s.hour === index)
                      .map((event) => (
                        <div
                          key={event.title}
                          className={cn(
                            'p-3 rounded-lg text-white text-sm font-medium cursor-move hover:shadow-md transition-all',
                            event.color
                          )}
                          style={{ minHeight: `${event.duration * 40}px` }}
                        >
                          <div className="flex items-center justify-between">
                            <span>{event.title}</span>
                            <div className="flex gap-1">
                              <Edit2 className="w-3 h-3 opacity-0 hover:opacity-100" />
                              <Trash2 className="w-3 h-3 opacity-0 hover:opacity-100" />
                            </div>
                          </div>
                          <div className="text-xs opacity-75">{event.duration}h duration</div>
                        </div>
                      ))}
                    {schedule.filter((s) => s.hour === index).length === 0 && (
                      <div className="h-10 border-2 border-dashed border-muted rounded-lg flex items-center justify-center text-xs text-muted-foreground hover:bg-accent transition-colors">
                        + Add event
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Daily Notes */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Daily Notes</CardTitle>
            <CardDescription>Document your thoughts and priorities</CardDescription>
          </CardHeader>
          <CardContent>
            <textarea
              placeholder="Write your thoughts, priorities, or notes for today..."
              className="w-full h-32 p-4 rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button className="mt-4">Save Notes</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Calendar Integration */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { date: 'Today', events: 5 },
                { date: 'Tomorrow', events: 3 },
                { date: 'Wed', events: 4 },
              ].map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent">
                  <span className="font-medium">{day.date}</span>
                  <Badge variant="secondary">{day.events} events</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
