import { Pool, QueryResult, QueryResultRow } from 'pg';

const globalWithPg = global as typeof globalThis & { pgPool?: Pool };
let pool: Pool | null = globalWithPg.pgPool || null;

function getPool() {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL must be set in the environment');
  }

  const url = new URL(connectionString);
  const isLocalDatabase = ['localhost', '127.0.0.1', '::1'].includes(url.hostname);

  pool = new Pool({
    connectionString,
    ssl: isLocalDatabase ? undefined : { rejectUnauthorized: false },
  });

  if (process.env.NODE_ENV !== 'production') {
    globalWithPg.pgPool = pool;
  }

  return pool;
}

let initPromise: Promise<void> | null = null;

const schemaSql = `
CREATE TABLE IF NOT EXISTS goals (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  "targetDate" DATE,
  progress NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'NOT_STARTED',
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS habits (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  name TEXT NOT NULL,
  streak INT NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS habit_logs (
  id TEXT PRIMARY KEY,
  "habitId" TEXT NOT NULL,
  "completedDate" DATE NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_habit FOREIGN KEY ("habitId") REFERENCES habits(id) ON DELETE CASCADE,
  CONSTRAINT unique_habit_completed_date UNIQUE ("habitId", "completedDate")
);

CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT NOT NULL DEFAULT 'MEDIUM',
  "dueDate" DATE,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS timetable (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "startTime" TEXT NOT NULL,
  "endTime" TEXT NOT NULL,
  activity TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

async function initializeSchema() {
  const client = await getPool().connect();
  try {
    await client.query(schemaSql);
  } finally {
    client.release();
  }
}

async function ensureSchema() {
  if (!initPromise) {
    initPromise = initializeSchema().catch((error) => {
      initPromise = null;
      throw error;
    });
  }
  return initPromise;
}

export async function query<T extends QueryResultRow = any>(text: string, params: any[] = []): Promise<QueryResult<T>> {
  await ensureSchema();
  const result = await getPool().query(text, params);
  return result as QueryResult<T>;
}
