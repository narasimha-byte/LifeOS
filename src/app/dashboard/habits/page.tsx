'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle2, Flame } from 'lucide-react';

const mockHabits = [
  {
    id: 1,
    name: 'Morning Exercise',
    frequency: 'Daily',
    streak: 25,
    color: '#ef4444',
    thisWeek: [true, true, true, true, false, true, true],
  },
  {
    id: 2,
    name: 'Read 30 minutes',
    frequency: 'Daily',
    streak: 12,
    color: '#3b82f6',
    thisWeek: [true, true, true, false, true, true, false],
  },
  {
    id: 3,
    name: 'Meditation',
    frequency: 'Daily',
    streak: 8,
    color: '#10b981',
    thisWeek: [true, true, true, true, true, false, false],
  },
  {
    id: 4,
    name: 'Learn something new',
    frequency: 'Daily',
    streak: 15,
    color: '#f59e0b',
    thisWeek: [true, true, true, true, true, true, true],
  },
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitTracker() {
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

  const getHeatmapColor = (completed: boolean, color: string): string => {
    if (!completed) return 'bg-muted';
    return color;
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
          <h1 className="text-3xl font-bold">Habit Tracker</h1>
          <p className="text-muted-foreground">Build and maintain your daily habits</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Habit
        </Button>
      </motion.div>

      {/* Habits */}
      <motion.div variants={itemVariants} className="space-y-4">
        {mockHabits.map((habit) => (
          <Card key={habit.id} className="glass border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {habit.name}
                    <Badge variant="secondary" className="gap-1">
                      <Flame className="w-3 h-3" />
                      {habit.streak}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{habit.frequency}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* This Week Heatmap */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">This Week</h4>
                <div className="grid grid-cols-7 gap-2">
                  {habit.thisWeek.map((completed, idx) => (
                    <motion.div
                      key={idx}
                      className={`aspect-square rounded-lg flex items-center justify-center font-semibold text-white cursor-pointer transition-transform hover:scale-110`}
                      style={{
                        backgroundColor: getHeatmapColor(completed, habit.color),
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {completed && <CheckCircle2 className="w-4 h-4" />}
                      <span className="text-xs">{daysOfWeek[idx].charAt(0)}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Monthly Heatmap */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">January 2025</h4>
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded text-xs flex items-center justify-center font-medium transition-transform hover:scale-110 cursor-pointer`}
                      style={{
                        backgroundColor:
                          Math.random() > 0.3
                            ? habit.color
                            : 'hsl(var(--muted))',
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion Percentage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Completion Rate</span>
                  <span className="font-semibold">
                    {Math.round((habit.thisWeek.filter(Boolean).length / 7) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{
                      backgroundColor: habit.color,
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(habit.thisWeek.filter(Boolean).length / 7) * 100}%`,
                    }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
