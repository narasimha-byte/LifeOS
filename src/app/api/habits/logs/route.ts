import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db-client';

function getDateString(date: Date) {
  return date.toISOString().split('T')[0];
}

function previousDate(dateString: string) {
  const date = new Date(dateString);
  date.setDate(date.getDate() - 1);
  return getDateString(date);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const habitId = searchParams.get('habitId');
    const logId = searchParams.get('id');

    if (logId) {
      const log = await prisma.habitLog.findUnique({
        where: { id: logId },
      });

      if (!log) {
        return NextResponse.json(
          { error: 'Habit log not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(log);
    }

    if (!habitId) {
      return NextResponse.json(
        { error: 'habitId is required' },
        { status: 400 }
      );
    }

    const logs = await prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { completedDate: 'desc' },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Failed to fetch habit logs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch habit logs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { habitId, completedDate } = body;

    if (!habitId || !completedDate) {
      return NextResponse.json(
        { error: 'habitId and completedDate are required' },
        { status: 400 }
      );
    }

    // Convert to Date object for Prisma
    const dateObj = new Date(completedDate);

    // Check if already logged for this date
    const existing = await prisma.habitLog.findUnique({
      where: {
        habitId_completedDate: {
          habitId,
          completedDate: dateObj,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Completion already logged for this date' },
        { status: 400 }
      );
    }

    const log = await prisma.habitLog.create({
      data: {
        habitId,
        completedDate: dateObj,
      },
    });

    // Calculate new streak
    const logs = await prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { completedDate: 'desc' },
    });

    let streak = 0;
    let expectedDate = getDateString(dateObj);

    for (const logEntry of logs) {
      const logDate = logEntry.completedDate as unknown as Date;
      const currentDate = getDateString(logDate);
      if (currentDate === expectedDate) {
        streak += 1;
        expectedDate = previousDate(expectedDate);
      } else {
        break;
      }
    }

    // Update habit streak
    await prisma.habit.update({
      where: { id: habitId },
      data: { streak },
    });

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error('Failed to log habit:', error);
    return NextResponse.json(
      { error: 'Failed to log habit' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const logId = searchParams.get('id');

    if (!logId) {
      return NextResponse.json(
        { error: 'Log ID is required' },
        { status: 400 }
      );
    }

    const log = await prisma.habitLog.findUnique({
      where: { id: logId },
    });

    if (!log) {
      return NextResponse.json(
        { error: 'Habit log not found' },
        { status: 404 }
      );
    }

    const habitId = log.habitId;

    // Delete the log
    await prisma.habitLog.delete({
      where: { id: logId },
    });

    // Recalculate streak
    const logs = await prisma.habitLog.findMany({
      where: { habitId },
      orderBy: { completedDate: 'desc' },
    });

    let streak = 0;
    if (logs.length > 0) {
      const firstLogDate = logs[0].completedDate as unknown as Date;
      let expectedDate = getDateString(firstLogDate);

      for (const logEntry of logs) {
        const logDate = logEntry.completedDate as unknown as Date;
        const currentDate = getDateString(logDate);
        if (currentDate === expectedDate) {
          streak += 1;
          expectedDate = previousDate(expectedDate);
        } else {
          break;
        }
      }
    }

    // Update habit streak
    await prisma.habit.update({
      where: { id: habitId },
      data: { streak },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete habit log:', error);
    return NextResponse.json(
      { error: 'Failed to delete habit log' },
      { status: 500 }
    );
  }
}
