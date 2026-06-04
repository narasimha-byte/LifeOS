# LifeOS - Personal Life Management System

A premium, production-ready personal life management web application built with Next.js 15, TypeScript, and Supabase.

## ✨ Features

### 📊 Dashboard
- Welcome section with daily quote
- Real-time productivity score
- Goal completion percentage
- Habit streaks and overview
- Upcoming tasks preview
- Analytics cards with trends
- Beautiful data visualizations

### 📅 Daily Planner
- Hourly timetable scheduling
- Drag-and-drop task management
- Calendar integration
- Daily notes
- Priority-based organization

### 🎯 Goals
- Short-term and long-term goals
- Progress tracking with visual indicators
- Goal categories (Health, Career, Business, Finance, Learning, Personal)
- Milestone tracking
- Deadline management
- Status tracking (Not Started, In Progress, Completed, Cancelled)

### ✅ Habits
- Daily habit tracking
- Streak counting
- Weekly heatmap visualization
- Monthly completion heatmap
- Habit consistency metrics
- Visual progress indicators

### 📝 Tasks
- Kanban board view
- List view
- Priority system (Low, Medium, High, Urgent)
- Due date management
- Task completion tracking
- Tag-based filtering
- Quick search

### 📖 Journal
- Rich text journaling
- Mood tracking
- Entry search functionality
- Tag organization
- Date-based organization
- Reflection insights

### ⚡ Focus Mode
- Pomodoro timer
- Deep work sessions
- Distraction-free interface
- Session history
- Focus time analytics
- Sound notifications

### 📈 Analytics
- Productivity trends
- Habit consistency charts
- Goal progress visualization
- Task completion metrics
- Weekly and monthly reports
- Custom date ranges

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15** | React framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Shadcn UI** | UI components |
| **Framer Motion** | Animations |
| **Recharts** | Data visualization |
| **Lucide Icons** | Icons |
| **Supabase** | Database & Auth |
| **Prisma** | ORM |
| **PostgreSQL** | Database |

## 📂 Project Structure

```
LifeOS/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── users/
│   │   │   ├── goals/
│   │   │   ├── habits/
│   │   │   ├── tasks/
│   │   │   ├── timetable/
│   │   │   └── journal/
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── planner/
│   │   │   ├── goals/
│   │   │   ├── habits/
│   │   │   ├── tasks/
│   │   │   ├── journal/
│   │   │   ├── focus/
│   │   │   └── analytics/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── providers.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── sidebar.tsx
│   │   │   └── topbar.tsx
│   │   ├── dashboard/
│   │   │   ├── stats-card.tsx
│   │   │   └── progress-ring.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── badge.tsx
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── db-services.ts
│   │   └── utils.ts
│   ├── hooks/
│   └── utils/
│       ├── date.ts
│       └── helpers.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       └── 001_init.sql
├── public/
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── SUPABASE_SETUP.md
```

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/lifeos.git
cd LifeOS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase Database

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed instructions.

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=your_database_url
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run Migrations

```bash
npx prisma db push
```

### 7. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:push      # Push schema to database
npm run db:seed      # Seed sample data

# Linting
npm run lint         # Run ESLint
```

## 🎨 Design Features

- **Modern Glassmorphism** - Frosted glass UI effects
- **Beautiful Gradients** - Smooth color transitions
- **Smooth Animations** - Framer Motion transitions
- **Responsive Design** - Mobile, tablet, desktop
- **Dark/Light Mode** - Theme switching support
- **Professional Typography** - Inter font family
- **Premium Dashboard** - Polished, elegant interface

## 🔐 Security

- ✅ Type-safe database queries with Prisma
- ✅ Secure API routes with authentication
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Rate limiting ready
- ✅ Supabase Row Level Security (RLS)
- ✅ Environment variable management

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  createdAt TIMESTAMP DEFAULT NOW()
);
```

### Goals Table
```sql
CREATE TABLE goals (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  targetDate TIMESTAMP,
  progress FLOAT DEFAULT 0,
  status TEXT DEFAULT 'NOT_STARTED',
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES users(id)
);
```

[See SUPABASE_SETUP.md for complete schema]

## 🔗 API Integration

Example API calls:

```typescript
// Get user goals
const response = await fetch(`/api/goals?userId=${userId}`);
const goals = await response.json();

// Create new task
const taskResponse = await fetch('/api/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user-id',
    title: 'Complete project',
    priority: 'HIGH',
    dueDate: '2025-01-25'
  })
});

// Log habit
const habitLog = await fetch('/api/habits/logs', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    habitId: 'habit-id',
    completedDate: '2025-01-15'
  })
});
```

## 📊 Database Services

Pre-built services for common operations:

```typescript
import {
  userServices,
  goalServices,
  habitServices,
  taskServices,
  analyticsServices
} from '@/lib/db-services';

// Get user statistics
const stats = await userServices.getUserStats(userId);

// Get goal progress
const progress = await goalServices.getGoalProgress(userId);

// Get user analytics
const analytics = await analyticsServices.getUserAnalytics(userId);
```

## 🎯 Component Library

### Pre-built Components
- `<Button>` - Customizable button with variants
- `<Card>` - Card container with styling
- `<Input>` - Styled input field
- `<Badge>` - Status badge
- `<StatsCard>` - Dashboard stats card
- `<ProgressRing>` - Circular progress indicator

### Usage
```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <Button>Click me</Button>
    </Card>
  );
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Other Platforms

- AWS
- Netlify
- Heroku
- Cloudflare Pages
- Railway

## 📈 Performance Optimizations

- ✅ Image optimization with Next.js Image
- ✅ Code splitting with dynamic imports
- ✅ Lazy loading components
- ✅ Database query optimization with indexes
- ✅ Caching strategies
- ✅ Compression with Gzip

## 🐛 Known Issues & Limitations

- Journal entries support markdown in future versions
- Real-time updates coming soon with Supabase Real-time
- Advanced analytics dashboard in development

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file

## 📞 Support

- 📧 Email: support@lifeos.app
- 💬 Discord: [Join Community](https://discord.gg/lifeos)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/lifeos/issues)
- 📖 Docs: [Full Documentation](./SUPABASE_SETUP.md)

## 🙏 Acknowledgments

- Inspired by Notion, Linear, and Apple design principles
- Built with incredible open-source tools
- Special thanks to the Supabase and Next.js communities

## 📊 Stats

- **Lines of Code:** 5,000+
- **Components:** 15+
- **API Routes:** 7
- **Database Tables:** 7
- **UI Elements:** 50+

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## 🎉 Features Roadmap

- [ ] Real-time collaboration
- [ ] Mobile app
- [ ] Advanced calendar integration
- [ ] AI-powered insights
- [ ] Budget tracking
- [ ] Integration with third-party apps
- [ ] Social features
- [ ] Dark mode improvements

---

**LifeOS** - Your Personal Operating System for Life 🚀

Made with ❤️ by the LifeOS Team

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production Ready ✅
