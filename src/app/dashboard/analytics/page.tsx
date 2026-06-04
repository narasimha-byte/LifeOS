'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const productivityData = [
  { week: 'Week 1', score: 65 },
  { week: 'Week 2', score: 72 },
  { week: 'Week 3', score: 68 },
  { week: 'Week 4', score: 85 },
  { week: 'Week 5', score: 92 },
  { week: 'Week 6', score: 88 },
];

const habitData = [
  { week: 'Week 1', consistency: 60 },
  { week: 'Week 2', consistency: 65 },
  { week: 'Week 3', consistency: 70 },
  { week: 'Week 4', consistency: 75 },
  { week: 'Week 5', consistency: 82 },
  { week: 'Week 6', consistency: 88 },
];

const taskCompletionData = [
  { day: 'Mon', completed: 8, pending: 3 },
  { day: 'Tue', completed: 10, pending: 2 },
  { day: 'Wed', completed: 7, pending: 4 },
  { day: 'Thu', completed: 12, pending: 1 },
  { day: 'Fri', completed: 9, pending: 2 },
  { day: 'Sat', completed: 5, pending: 3 },
  { day: 'Sun', completed: 6, pending: 2 },
];

const focusTimeData = [
  { date: 'Jan 1', hours: 2.5 },
  { date: 'Jan 2', hours: 3 },
  { date: 'Jan 3', hours: 2 },
  { date: 'Jan 4', hours: 4 },
  { date: 'Jan 5', hours: 3.5 },
  { date: 'Jan 6', hours: 4.5 },
  { date: 'Jan 7', hours: 3.2 },
];

export default function Analytics() {
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
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your progress and insights</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Productivity', value: '82%', trend: '+8%', color: 'text-blue-500' },
          { label: 'Goal Progress', value: '68%', trend: '+12%', color: 'text-purple-500' },
          { label: 'Habit Consistency', value: '88%', trend: '+5%', color: 'text-green-500' },
          { label: 'Focus Hours', value: '24.7h', trend: '+2.5h', color: 'text-orange-500' },
        ].map((kpi) => (
          <Card key={kpi.label} className="glass border-white/20">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <div className="flex items-baseline justify-between">
                  <div className={cn('text-3xl font-bold', kpi.color)}>{kpi.value}</div>
                  <Badge variant="secondary" className="flex items-center gap-1 text-xs text-green-500">
                    <TrendingUp className="w-3 h-3" />
                    {kpi.trend}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Productivity Trend */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Productivity Score Trend</CardTitle>
            <CardDescription>Weekly average</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Habit Consistency */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Habit Consistency</CardTitle>
            <CardDescription>Weekly performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={habitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="consistency"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Task Completion */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
            <CardDescription>This week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Focus Time */}
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Daily Focus Time</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={focusTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="hours" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Insights */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Weekly Insights</CardTitle>
            <CardDescription>Your performance this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">✨ Highlights</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• You completed 57 tasks this week, +15% from last week</li>
                <li>• Maintained 88% habit consistency across all tracked habits</li>
                <li>• Focused for 24.7 hours, your best week yet!</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium">💡 Recommendations</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Consider scheduling more deep work sessions on Monday and Tuesday</li>
                <li>• Your meditation habit needs attention - log 3 more sessions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
