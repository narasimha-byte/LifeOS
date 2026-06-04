'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface Session {
  id: number;
  title: string;
  duration: number;
  type: 'pomodoro' | 'deepwork';
  completed: boolean;
  completedAt?: Date;
}

const mockSessions: Session[] = [
  { id: 1, title: 'Design Review', duration: 25, type: 'pomodoro', completed: true, completedAt: new Date() },
  { id: 2, title: 'Code Implementation', duration: 90, type: 'deepwork', completed: true, completedAt: new Date(Date.now() - 3600000) },
  { id: 3, title: 'Meeting Prep', duration: 25, type: 'pomodoro', completed: true, completedAt: new Date(Date.now() - 7200000) },
];

export default function FocusMode() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [currentSession, setCurrentSession] = useState<Partial<Session> | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (!isMuted) {
        // Play notification sound
        const audio = new Audio(
          'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj=='
        );
        audio.play().catch(() => {});
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isMuted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  const completedCount = sessions.filter((s) => s.completed).length;
  const totalFocusTime = sessions.reduce((acc, s) => acc + s.duration, 0);

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
          <h1 className="text-3xl font-bold">Focus Mode</h1>
          <p className="text-muted-foreground">Deep work & pomodoro sessions</p>
        </div>
      </motion.div>

      {/* Main Timer */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <CardContent className="pt-12 pb-12">
            <div className="space-y-8">
              {/* Timer Display */}
              <div className="text-center space-y-4">
                <div className="inline-block">
                  <div className="text-8xl font-bold font-mono tracking-tight text-primary">
                    {formatTime(timeLeft)}
                  </div>
                </div>
                <p className="text-lg text-muted-foreground">Focus time remaining</p>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  onClick={toggleTimer}
                  size="lg"
                  className="gap-2 px-8"
                  variant={isRunning ? 'destructive' : 'default'}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Start
                    </>
                  )}
                </Button>
                <Button onClick={resetTimer} variant="outline" size="lg" className="gap-2">
                  <RotateCcw className="w-5 h-5" />
                  Reset
                </Button>
                <Button
                  onClick={() => setIsMuted(!isMuted)}
                  variant="outline"
                  size="lg"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-white/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{completedCount}</div>
              <p className="text-sm text-muted-foreground">Sessions Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{totalFocusTime}m</div>
              <p className="text-sm text-muted-foreground">Total Focus Time</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass border-white/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">8.5h</div>
              <p className="text-sm text-muted-foreground">This Week</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Session History */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-white/20">
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Your focus session history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors border border-border/40"
              >
                <div>
                  <p className="font-medium">{session.title}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {session.type === 'pomodoro' ? '🍅' : '⚡'} {session.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {session.duration} min
                    </Badge>
                  </div>
                </div>
                {session.completed && (
                  <Badge variant="default" className="gap-1">
                    ✓ Completed
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
