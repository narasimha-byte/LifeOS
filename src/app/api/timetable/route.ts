import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function mapEntry(row: any) {
  return {
    id: row.id,
    userId: row.userId,
    startTime: row.startTime,
    endTime: row.endTime,
    activity: row.activity,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') ?? undefined;
    const entryId = searchParams.get('id') ?? undefined;

    if (entryId) {
      const result = await query(
        `SELECT id, "userId" AS "userId", "startTime" AS "startTime", "endTime" AS "endTime", activity, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt" FROM timetable WHERE id = $1`,
        [entryId]
      );

      if (result.rows.length === 0) {
        return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
      }

      return NextResponse.json(mapEntry(result.rows[0]));
    }

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const result = await query(
      `SELECT id, "userId" AS "userId", "startTime" AS "startTime", "endTime" AS "endTime", activity, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt" FROM timetable WHERE "userId" = $1 ORDER BY "startTime" ASC`,
      [userId]
    );

    return NextResponse.json(result.rows.map(mapEntry));
  } catch (error) {
    console.error('Failed to fetch timetable entries:', error);
    return NextResponse.json({ error: 'Failed to fetch timetable entries' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, startTime, endTime, activity } = body;

    if (!userId || !startTime || !endTime || !activity) {
      return NextResponse.json({ error: 'userId, startTime, endTime, and activity are required' }, { status: 400 });
    }

    const id = crypto.randomUUID();
    const result = await query(
      `INSERT INTO timetable (id, "userId", "startTime", "endTime", activity) VALUES ($1, $2, $3, $4, $5) RETURNING id, "userId" AS "userId", "startTime" AS "startTime", "endTime" AS "endTime", activity, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt"`,
      [id, userId, startTime, endTime, activity]
    );

    return NextResponse.json(mapEntry(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error('Failed to create timetable entry:', error);
    return NextResponse.json({ error: 'Failed to create timetable entry' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, startTime, endTime, activity } = body;

    if (!id) {
      return NextResponse.json({ error: 'Entry ID is required' }, { status: 400 });
    }

    const updates: string[] = [];
    const values: any[] = [];

    if (startTime !== undefined) {
      values.push(startTime);
      updates.push(`"startTime" = $${values.length}`);
    }

    if (endTime !== undefined) {
      values.push(endTime);
      updates.push(`"endTime" = $${values.length}`);
    }

    if (activity !== undefined) {
      values.push(activity);
      updates.push(`activity = $${values.length}`);
    }

    if (updates.length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    values.push(id);
    const result = await query(
      `UPDATE timetable SET ${updates.join(', ')}, "updatedAt" = NOW() WHERE id = $${values.length} RETURNING id, "userId" AS "userId", "startTime" AS "startTime", "endTime" AS "endTime", activity, "createdAt" AS "createdAt", "updatedAt" AS "updatedAt"`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    return NextResponse.json(mapEntry(result.rows[0]));
  } catch (error) {
    console.error('Failed to update timetable entry:', error);
    return NextResponse.json({ error: 'Failed to update timetable entry' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get('id');

    if (!entryId) {
      return NextResponse.json({ error: 'Entry ID is required' }, { status: 400 });
    }

    await query(`DELETE FROM timetable WHERE id = $1`, [entryId]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete timetable entry:', error);
    return NextResponse.json({ error: 'Failed to delete timetable entry' }, { status: 500 });
  }
}
