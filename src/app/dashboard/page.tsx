'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  CheckCircle2,
  Flame,
  Zap,
  TrendingUp,
  Calendar,
  Clock,
  Target,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ProgressRing } from '@/components/dashboard/progress-ring';
import { getGreeting, getRandomQuote, formatDate } from '@/utils/date';
import { formatPercentage } from '@/utils/date';

// Mock data
const mockTasks = [
  { id: 1, title: 'Complete project proposal', completed: true, dueDate: new Date() },
  { id: 2, title: 'Review team feedback', completed: false, dueDate: new Date() },
  { id: 3, title: 'Update documentation', completed: false, dueDate: new Date(Date.now() + 86400000) },
];

const mockHabits = [
  { id: 1, name: 'Morning Exercise', streak: 12, completed: true },
  { id: 2, name: 'Reading', streak: 8, completed: true },
  { id: 3, name: 'Meditation', streak: 5, completed: false },
];

const mockChartData = [
  { day: 'Mon', productivity: 85, focus: 120 },
  { day: 'Tue', productivity: 92, focus: 145 },
  { day: 'Wed', productivity: 88, focus: 130 },
  { day: 'Thu', productivity: 95, focus: 160 },
  { day: 'Fri', productivity: 90, focus: 140 },
  { day: 'Sat', productivity: 78, focus: 100 },
  { day: 'Sun', productivity: 82, focus: 110 },
];

const goalProgressData = [
  { name: 'Health', value: 75, color: '#ef4444' },
  { name: 'Career', value: 60, color: '#3b82f6' },
  { name: 'Finance', value: 45, color: '#8b5cf6' },
  { name: 'Learning', value: 85, color: '#10b981' },
];

export default function Dashboard() {
  const greeting = getGreeting();
  const quote = getRandomQuote();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants}>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold gradient-text">{greeting}, User! 👋</h1>
          <p className="text-muted-foreground italic text-lg">"{quote}"</p>
        </div>
      </motion.div>

      {/* Top Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatsCard
          title="Productivity Score"
          value="87"
          description="+5% from last week"
          trend={{ value: 5, direction: 'up' }}
          icon={<Zap className="w-5 h-5" />}
        />
        <StatsCard
          title="Goal Progress"
          value="68%"
          description="3 goals in progress"
          icon={<Target className="w-5 h-5" />}
        />
        <StatsCard
          title="Current Streak"
          value="12"
          description="Days of consistency"
          trend={{ value: 3, direction: 'up' }}
          icon={<Flame className="w-5 h-5" />}
        />
        <StatsCard
          title="Focus Time"
          value="8.5h"
          description="This week"
          icon={<Clock className="w-5 h-5" />}
        />
      </motion.div>

      {/* Main Content Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Productivity Chart */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Weekly Productivity</CardTitle>
              <CardDescription>Your focus time and productivity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockChartData}>
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
                  <Bar dataKey="productivity" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="focus" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card className="glass border-white/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Tasks</CardTitle>
                  <CardDescription>3 tasks in total</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        task.completed
                          ? 'bg-green-500 border-green-500'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {task.completed && (
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={task.completed ? 'line-through text-muted-foreground' : ''}>
                        {task.title}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {formatDate(task.dueDate)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Goal Progress */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle>Goal Progress</CardTitle>
              <CardDescription>Your main categories</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={goalProgressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {goalProgressData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Habits */}
          <Card className="glass border-white/20">
            <CardHeader>
              <CardTitle className="text-lg">Habits</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockHabits.map((habit) => (
                  <div key={habit.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{habit.name}</p>
                      <Badge
                        variant={habit.completed ? 'default' : 'outline'}
                        className="text-xs"
                      >
                        <Flame className="w-3 h-3 mr-1" />
                        {habit.streak}
                      </Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                        style={{ width: `${(habit.streak / 30) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Bottom Section - Daily Quote and CTA */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-lg font-semibold italic">
                "Success is not final, failure is not fatal."
              </p>
              <Button>Continue Your Journey</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
