import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function mapHabit(row: any) {
  return {
    id: row.id,
    userId: row.userId,
    name: row.name,
    streak: row.streak,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    habitLogs: row.habitLogs || [],
  };
}

function mapHabitLog(row: any) {
  return {
    id: row.id,
    habitId: row.habitId,
    completedDate: row.completedDate,
    createdAt: row.createdAt,
  };
}

async function fetchLogsForHabitIds(habitIds: string[]) {
  if (habitIds.length === 0) {
    return [];
  }

  const result = await query(
    `SELECT id, "habitId" AS "habitId", "completedDate"::text AS "completedDate", "createdAt" AS "createdAt" FROM habit_logs WHERE "habitId" = ANY($1::text[]) ORDER BY "completedDate" DESC`,
    [habitIds]
  );

  return result.rows.map(mapHabitLog);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') ?? undefined;
    const habitId = searchParams.get('id') ?? undefined;

    if (habitId) {
      const habitResult = await query(
        `SELECT id, "userId" AS "userId", name, streak, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt" FROM habits WHERE id = $1`,
        [habitId]
      );

      if (habitResult.rows.length === 0) {
        return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
      }

      const logsResult = await query(
        `SELECT id, "habitId" AS "habitId", "completedDate"::text AS "completedDate", "createdAt" AS "createdAt" FROM habit_logs WHERE "habitId" = $1 ORDER BY "completedDate" DESC`,
        [habitId]
      );

      return NextResponse.json({ ...mapHabit(habitResult.rows[0]), habitLogs: logsResult.rows.map(mapHabitLog) });
    }

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const habitsResult = await query(
      `SELECT id, "userId" AS "userId", name, streak, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt" FROM habits WHERE "userId" = $1 ORDER BY "createdAt" DESC`,
      [userId]
    );

    const habitIds = habitsResult.rows.map((habit: any) => habit.id);
    const logs = await fetchLogsForHabitIds(habitIds);

    const habits = habitsResult.rows.map((habit: any) => ({
      ...mapHabit(habit),
      habitLogs: logs.filter((log: any) => log.habitId === habit.id).slice(0, 7),
    }));

    return NextResponse.json(habits);
  } catch (error) {
    console.error('Failed to fetch habits:', error);
    return NextResponse.json({ error: 'Failed to fetch habits' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name } = body;

    if (!userId || !name) {
      return NextResponse.json({ error: 'userId and name are required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const result = await query(
      `INSERT INTO habits (id, "userId", name, streak) VALUES ($1, $2, $3, $4) RETURNING id, "userId" AS "userId", name, streak, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt"`,
      [id, userId, name, 0]
    );

    return NextResponse.json({ ...mapHabit(result.rows[0]), habitLogs: [] }, { status: 201 });
  } catch (error) {
    console.error('Failed to create habit:', error);
    return NextResponse.json({ error: 'Failed to create habit' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, streak } = body;

    if (!id) {
      return NextResponse.json({ error: 'Habit ID is required' }, { status: 400 });
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (name !== undefined) {
      values.push(name);
      updates.push(`name = $${values.length}`);
    }

    if (streak !== undefined) {
      values.push(streak);
      updates.push(`streak = $${values.length}`);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    const result = await query(
      `UPDATE habits SET ${updates.join(', ')}, "updatedAt" = NOW() WHERE id = $${values.length} RETURNING id, "userId" AS "userId", name, streak, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt"`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    const logsResult = await query(
      `SELECT id, "habitId" AS "habitId", "completedDate"::text AS "completedDate", "createdAt" AS "createdAt" FROM habit_logs WHERE "habitId" = $1 ORDER BY "completedDate" DESC`,
      [id]
    );

    return NextResponse.json({ ...mapHabit(result.rows[0]), habitLogs: logsResult.rows.map(mapHabitLog) });
  } catch (error) {
    console.error('Failed to update habit:', error);
    return NextResponse.json({ error: 'Failed to update habit' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const habitId = searchParams.get('id');

    if (!habitId) {
      return NextResponse.json({ error: 'Habit ID is required' }, { status: 400 });
    }

    await query(`DELETE FROM habits WHERE id = $1`, [habitId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete habit:', error);
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}
