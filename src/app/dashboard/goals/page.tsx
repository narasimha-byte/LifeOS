'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, CheckCircle2, Edit2, Trash2, Target } from 'lucide-react';

const categories = [
  { name: 'Health', icon: '❤️', color: 'bg-red-500/10' },
  { name: 'Career', icon: '💼', color: 'bg-blue-500/10' },
  { name: 'Business', icon: '📊', color: 'bg-green-500/10' },
  { name: 'Finance', icon: '💰', color: 'bg-purple-500/10' },
  { name: 'Learning', icon: '📚', color: 'bg-yellow-500/10' },
  { name: 'Personal', icon: '✨', color: 'bg-pink-500/10' },
];

const mockGoals = [
  {
    id: 1,
    title: 'Lose 10 lbs',
    category: 'Health',
    progress: 60,
    deadline: 'Mar 31, 2025',
    milestones: [
      { title: 'Join gym', completed: true },
      { title: 'Create meal plan', completed: true },
      { title: 'Reach 190 lbs', completed: false },
      { title: 'Reach 180 lbs', completed: false },
    ],
  },
  {
    id: 2,
    title: 'Complete certification',
    category: 'Career',
    progress: 45,
    deadline: 'Jun 30, 2025',
    milestones: [
      { title: 'Enroll in course', completed: true },
      { title: 'Complete 50%', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Read 24 books',
    category: 'Learning',
    progress: 25,
    deadline: 'Dec 31, 2025',
    milestones: [{ title: 'Read 6 books', completed: true }],
  },
];

export default function Goals() {
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
          <h1 className="text-3xl font-bold">Goals</h1>
          <p className="text-muted-foreground">Track your short and long-term goals</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Goal
        </Button>
      </motion.div>

      {/* Category Tabs */}
      <motion.div variants={itemVariants} className="flex gap-3 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button key={cat.name} variant="outline" className="whitespace-nowrap">
            {cat.icon} {cat.name}
          </Button>
        ))}
      </motion.div>

      {/* Goals List */}
      <motion.div variants={itemVariants} className="space-y-4">
        {mockGoals.map((goal) => (
          <Card key={goal.id} className="glass border-white/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{goal.title}</CardTitle>
                  <CardDescription>Deadline: {goal.deadline}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Progress</span>
                  <Badge variant="secondary">{goal.progress}%</Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              {/* Milestones */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Milestones</h4>
                <div className="space-y-2">
                  {goal.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded hover:bg-accent">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          milestone.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {milestone.completed && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className={milestone.completed ? 'line-through text-muted-foreground' : ''}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </motion.div>
  );
}
