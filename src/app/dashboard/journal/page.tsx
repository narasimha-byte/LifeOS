'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Heart, MessageCircle, Trash2 } from 'lucide-react';
import { formatDate } from '@/utils/date';

const moods = {
  terrible: { emoji: '😢', color: 'bg-red-500/10 text-red-500' },
  bad: { emoji: '😕', color: 'bg-orange-500/10 text-orange-500' },
  okay: { emoji: '😐', color: 'bg-yellow-500/10 text-yellow-500' },
  good: { emoji: '🙂', color: 'bg-blue-500/10 text-blue-500' },
  excellent: { emoji: '😄', color: 'bg-green-500/10 text-green-500' },
};

const mockEntries = [
  {
    id: 1,
    title: 'A great day at the office',
    content: 'Today was productive! I completed all my tasks and had a great meeting with the team. Feeling accomplished.',
    mood: 'excellent',
    date: new Date(),
    tags: ['work', 'achievement', 'team'],
  },
  {
    id: 2,
    title: 'Reflections on growth',
    content: 'Been thinking about my personal development journey. Made significant progress this quarter. Excited for what\'s next.',
    mood: 'good',
    date: new Date(Date.now() - 86400000),
    tags: ['growth', 'reflection', 'progress'],
  },
  {
    id: 3,
    title: 'Managing stress',
    content: 'Today was challenging but I handled it well. Practiced mindfulness and meditation. Feeling more centered.',
    mood: 'good',
    date: new Date(Date.now() - 172800000),
    tags: ['wellness', 'stress', 'mindfulness'],
  },
];

export default function Journal() {
  const [selectedMood, setSelectedMood] = useState<keyof typeof moods | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

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
          <h1 className="text-3xl font-bold">Journal</h1>
          <p className="text-muted-foreground">Reflect on your thoughts and feelings</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Entry
        </Button>
      </motion.div>

      {/* Search and Filter */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex gap-2 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search entries..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Mood Filter */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Filter by mood</p>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedMood === null ? 'default' : 'outline'}
              onClick={() => setSelectedMood(null)}
              size="sm"
            >
              All
            </Button>
            {Object.entries(moods).map(([mood, { emoji }]) => (
              <Button
                key={mood}
                variant={selectedMood === mood ? 'default' : 'outline'}
                onClick={() => setSelectedMood(mood as keyof typeof moods)}
                size="sm"
                className="gap-1"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Entries */}
      <motion.div variants={itemVariants} className="space-y-4">
        {mockEntries
          .filter((entry) =>
            entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.content.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .filter((entry) => selectedMood === null || entry.mood === selectedMood)
          .map((entry) => (
            <Card key={entry.id} className="glass border-white/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">
                        {moods[entry.mood as keyof typeof moods].emoji}
                      </span>
                      <CardTitle>{entry.title}</CardTitle>
                    </div>
                    <CardDescription>{formatDate(entry.date)}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground/80">{entry.content}</p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-border/40">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Heart className="w-4 h-4" />
                    Like
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="w-4 h-4" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </motion.div>
    </motion.div>
  );
}
