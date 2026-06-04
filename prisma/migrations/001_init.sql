-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create goals table
CREATE TABLE IF NOT EXISTS "goals" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "targetDate" TIMESTAMP,
  "progress" FLOAT NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create habits table
CREATE TABLE IF NOT EXISTS "habits" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "streak" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create habit_logs table
CREATE TABLE IF NOT EXISTS "habit_logs" (
  "id" TEXT PRIMARY KEY,
  "habitId" TEXT NOT NULL,
  "completedDate" DATE NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("habitId", "completedDate"),
  FOREIGN KEY ("habitId") REFERENCES "habits"("id") ON DELETE CASCADE
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS "tasks" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "priority" TEXT NOT NULL DEFAULT 'MEDIUM',
  "dueDate" TIMESTAMP,
  "completed" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create timetable table
CREATE TABLE IF NOT EXISTS "timetable" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "startTime" TEXT NOT NULL,
  "endTime" TEXT NOT NULL,
  "activity" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create journal_entries table
CREATE TABLE IF NOT EXISTS "journal_entries" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX idx_goals_userId ON "goals"("userId");
CREATE INDEX idx_goals_status ON "goals"("status");
CREATE INDEX idx_goals_targetDate ON "goals"("targetDate");

CREATE INDEX idx_habits_userId ON "habits"("userId");

CREATE INDEX idx_habit_logs_habitId ON "habit_logs"("habitId");
CREATE INDEX idx_habit_logs_completedDate ON "habit_logs"("completedDate");

CREATE INDEX idx_tasks_userId ON "tasks"("userId");
CREATE INDEX idx_tasks_completed ON "tasks"("completed");
CREATE INDEX idx_tasks_dueDate ON "tasks"("dueDate");

CREATE INDEX idx_timetable_userId ON "timetable"("userId");

CREATE INDEX idx_journal_entries_userId ON "journal_entries"("userId");
CREATE INDEX idx_journal_entries_createdAt ON "journal_entries"("createdAt");

CREATE INDEX idx_users_email ON "users"("email");
