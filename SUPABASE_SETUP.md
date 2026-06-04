# LifeOS - Production-Ready Database Setup Guide

This document provides complete setup instructions for LifeOS Supabase database configuration and API integration.

## 📋 Prerequisites

- Supabase account (free tier available at https://supabase.com)
- Node.js 18+ and npm/yarn
- Git

## 🚀 Quick Start

### 1. Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - **Project name:** lifeos
   - **Database password:** Create a strong password (save it!)
   - **Region:** Choose closest to your users
4. Click "Create new project" and wait for initialization (2-3 minutes)

### 2. Get Supabase Credentials

Once your project is created:

1. Go to **Settings** → **API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

3. Go to **Settings** → **Database**
4. Copy the connection string → `DATABASE_URL`

### 3. Setup Environment Variables

Create `.env.local` file in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Database
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres

# Next Auth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 4. Run Database Migrations

Execute SQL migration in Supabase SQL Editor:

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New Query**
3. Copy content from `prisma/migrations/001_init.sql`
4. Click **Run**

Or use Prisma:

```bash
npm install
npx prisma db push
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📊 Database Schema

### Tables Overview

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| **users** | User accounts | id, name, email, createdAt |
| **goals** | Goal tracking | id, userId, title, progress, status, targetDate |
| **habits** | Habit management | id, userId, name, streak, createdAt |
| **habit_logs** | Habit completion logs | id, habitId, completedDate |
| **tasks** | Task management | id, userId, title, priority, dueDate, completed |
| **timetable** | Daily schedule | id, userId, startTime, endTime, activity |
| **journal_entries** | Journal entries | id, userId, title, content, createdAt |

## 🔌 API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users?id=userId` - Get specific user
- `POST /api/users` - Create user
- `PUT /api/users` - Update user
- `DELETE /api/users?id=userId` - Delete user

### Goals
- `GET /api/goals?userId=userId` - Get user goals
- `GET /api/goals?id=goalId` - Get specific goal
- `POST /api/goals` - Create goal
- `PUT /api/goals` - Update goal
- `DELETE /api/goals?id=goalId` - Delete goal

### Habits
- `GET /api/habits?userId=userId` - Get user habits
- `GET /api/habits?id=habitId` - Get specific habit
- `POST /api/habits` - Create habit
- `PUT /api/habits` - Update habit
- `DELETE /api/habits?id=habitId` - Delete habit

### Habit Logs
- `GET /api/habits/logs?habitId=habitId` - Get habit logs
- `POST /api/habits/logs` - Log habit completion
- `DELETE /api/habits/logs?id=logId` - Delete log

### Tasks
- `GET /api/tasks?userId=userId` - Get user tasks
- `GET /api/tasks?id=taskId` - Get specific task
- `POST /api/tasks` - Create task
- `PUT /api/tasks` - Update task
- `DELETE /api/tasks?id=taskId` - Delete task

### Timetable
- `GET /api/timetable?userId=userId` - Get schedule
- `GET /api/timetable?id=entryId` - Get specific entry
- `POST /api/timetable` - Create schedule entry
- `PUT /api/timetable` - Update schedule entry
- `DELETE /api/timetable?id=entryId` - Delete entry

### Journal
- `GET /api/journal?userId=userId` - Get journal entries
- `GET /api/journal?id=entryId` - Get specific entry
- `POST /api/journal` - Create entry
- `PUT /api/journal` - Update entry
- `DELETE /api/journal?id=entryId` - Delete entry

## 🛠️ Database Services

Use pre-built services in `src/lib/db-services.ts`:

```typescript
import {
  userServices,
  goalServices,
  habitServices,
  taskServices,
  timetableServices,
  journalServices,
  analyticsServices,
} from '@/lib/db-services';

// Example: Get user stats
const { totalTasks, completedTasks, totalGoals } = await userServices.getUserStats(userId);

// Example: Get goal progress
const progress = await goalServices.getGoalProgress(userId);

// Example: Log habit
await habitServices.logHabit(habitId, '2025-01-15');
```

## 🔐 Security Best Practices

### Row Level Security (RLS)

Enable RLS on all tables:

```sql
-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own data
CREATE POLICY "Users can only see own data"
  ON users FOR SELECT
  USING (auth.uid()::text = id);
```

### Rate Limiting

Add rate limiting middleware in API routes:

```typescript
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
  requests: 50,
});

export async function GET(request: NextRequest) {
  await limiter.check(request);
  // ... rest of handler
}
```

## 📦 Deployment

### Vercel Deployment

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Environment Variables for Production

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=production-secret
NEXTAUTH_URL=https://your-domain.com
```

## 🧪 Testing

### Test User Creation

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Test Goal Creation

```bash
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -d '{
    "userId":"user-id",
    "title":"Learn TypeScript",
    "description":"Master TypeScript basics",
    "progress":30,
    "status":"IN_PROGRESS"
  }'
```

## 📚 Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

## 🐛 Troubleshooting

### Connection Issues

```bash
# Test database connection
psql postgresql://user:password@host/database
```

### Prisma Sync Issues

```bash
# Reset and resync
npx prisma migrate reset
npx prisma generate
```

### Clear Cache

```bash
rm -rf .next
npm run build
npm run dev
```

## 📞 Support

For issues:
1. Check [Supabase docs](https://supabase.com/docs)
2. Review [GitHub issues](https://github.com/supabase/supabase/issues)
3. Ask in [Supabase Discord](https://discord.supabase.com)

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production Ready ✅
