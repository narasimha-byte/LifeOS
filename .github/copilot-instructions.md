# LifeOS Project Instructions

This file contains custom instructions for working with the LifeOS project.

## Project Overview

LifeOS is a premium personal life management system built with Next.js 15, TypeScript, Tailwind CSS, and Supabase. It combines daily planning, goals, habits, productivity, journaling, time tracking, and analytics.

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript
- **Styling:** Tailwind CSS, Shadcn UI
- **Database:** Supabase (PostgreSQL)
- **ORM:** Prisma
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React

## Project Structure

```
src/
├── app/
│   ├── api/            # API routes (REST endpoints)
│   ├── dashboard/      # Main dashboard pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── providers.tsx   # Context/providers
├── components/
│   ├── common/         # Reusable components (sidebar, topbar)
│   ├── dashboard/      # Dashboard-specific components
│   └── ui/             # Base UI components
├── lib/
│   ├── supabase.ts     # Supabase client configuration
│   ├── db-services.ts  # Database service functions
│   └── utils.ts        # Utility functions
├── hooks/              # Custom React hooks
└── utils/
    ├── date.ts         # Date utilities
    └── helpers.ts      # Helper functions
```

## Key Files

- **Prisma Schema:** `prisma/schema.prisma`
- **Database Migrations:** `prisma/migrations/001_init.sql`
- **API Routes:** `src/app/api/*/route.ts`
- **Database Services:** `src/lib/db-services.ts`
- **Setup Guide:** `SUPABASE_SETUP.md`
- **Main Readme:** `README.md`

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Supabase
Follow `SUPABASE_SETUP.md` for complete setup instructions.

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Environment Variables
Copy `.env.example` to `.env.local` and add your Supabase credentials.

### 5. Run Development Server
```bash
npm run dev
```

## Development Guidelines

### Code Style

- **TypeScript:** Use strict mode for type safety
- **Components:** Functional components with hooks
- **Naming:** camelCase for variables/functions, PascalCase for components
- **Imports:** Use path aliases (@/)

### Database Operations

Use pre-built services from `src/lib/db-services.ts`:

```typescript
import { userServices, goalServices } from '@/lib/db-services';

// Get user stats
const stats = await userServices.getUserStats(userId);
```

### API Route Pattern

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabaseServer
      .from('table_name')
      .select('*');
    
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error message' }, { status: 500 });
  }
}
```

### Component Pattern

```typescript
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface ComponentProps {
  // Props
}

export function MyComponent({ }: ComponentProps) {
  return (
    <motion.div>
      <Card>
        {/* Content */}
      </Card>
    </motion.div>
  );
}
```

## Database Connections

### Supabase Client (Browser)
```typescript
import { supabase } from '@/lib/supabase';
```

### Supabase Server (Backend)
```typescript
import { supabaseServer } from '@/lib/supabase';
```

## Available API Endpoints

### Users
- `GET /api/users`
- `GET /api/users?id=userId`
- `POST /api/users`
- `PUT /api/users`
- `DELETE /api/users?id=userId`

### Goals
- `GET /api/goals?userId=userId`
- `POST /api/goals`
- `PUT /api/goals`
- `DELETE /api/goals?id=goalId`

### Habits
- `GET /api/habits?userId=userId`
- `POST /api/habits`
- `PUT /api/habits`
- `DELETE /api/habits?id=habitId`
- `GET /api/habits/logs?habitId=habitId`
- `POST /api/habits/logs`

### Tasks
- `GET /api/tasks?userId=userId`
- `POST /api/tasks`
- `PUT /api/tasks`
- `DELETE /api/tasks?id=taskId`

### Timetable
- `GET /api/timetable?userId=userId`
- `POST /api/timetable`
- `PUT /api/timetable`
- `DELETE /api/timetable?id=entryId`

### Journal
- `GET /api/journal?userId=userId`
- `POST /api/journal`
- `PUT /api/journal`
- `DELETE /api/journal?id=entryId`

## Common Tasks

### Adding a New Feature

1. **Define database model** in `prisma/schema.prisma`
2. **Run migration** `npx prisma migrate dev`
3. **Create API routes** in `src/app/api/feature/route.ts`
4. **Add services** in `src/lib/db-services.ts`
5. **Build components** in `src/components/`
6. **Create page** in `src/app/dashboard/feature/page.tsx`

### Testing API Routes

```bash
# Get
curl http://localhost:3000/api/users

# Post
curl -X POST http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -d '{"userId":"user-id","title":"Goal Title"}'

# Update
curl -X PUT http://localhost:3000/api/goals \
  -H "Content-Type: application/json" \
  -d '{"id":"goal-id","title":"Updated Title"}'

# Delete
curl -X DELETE http://localhost:3000/api/goals?id=goal-id
```

## Database Troubleshooting

### Connection Issues
```bash
# Test PostgreSQL connection
psql postgresql://user:password@host/database

# Check environment variables
echo $DATABASE_URL
```

### Prisma Issues
```bash
# Reset database
npx prisma migrate reset

# Generate client
npx prisma generate

# Check schema
npx prisma studio
```

### Supabase Issues
1. Check credentials in `.env.local`
2. Verify project is running in Supabase dashboard
3. Check network connectivity
4. Review browser console for CORS errors

## Performance Tips

- Use database indexes (already configured)
- Implement pagination for large datasets
- Cache frequently accessed data
- Use lazy loading for images
- Optimize bundle size with code splitting
- Monitor API response times

## Security Considerations

- Validate all user inputs
- Use environment variables for secrets
- Implement rate limiting on API routes
- Enable Supabase Row Level Security (RLS)
- Use HTTPS in production
- Sanitize user-generated content

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Docker
See Dockerfile in root directory

## Scripts Reference

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:push          # Push schema to database
npm run db:seed          # Seed sample data
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma ORM](https://www.prisma.io/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## Support

For issues or questions:
1. Check documentation files (README.md, SUPABASE_SETUP.md)
2. Review API route implementations
3. Check Supabase dashboard
4. Review browser console for errors
5. Check server logs

## Version Info

- **LifeOS Version:** 1.0.0
- **Next.js:** 15.0.0
- **Node:** 18+
- **Status:** Production Ready

---

**Last Updated:** January 2025
