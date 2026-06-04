import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase';

// GET all journal entries for a user
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const entryId = searchParams.get('id');

    if (!userId && !entryId) {
      return NextResponse.json(
        { error: 'userId or entryId is required' },
        { status: 400 }
      );
    }

    if (entryId) {
      const { data, error } = await supabaseServer
        .from('journal_entries')
        .select('*')
        .eq('id', entryId)
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    }

    const { data, error } = await supabaseServer
      .from('journal_entries')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch journal entries' },
      { status: 500 }
    );
  }
}

// POST create new journal entry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, content } = body;

    if (!userId || !title || !content) {
      return NextResponse.json(
        { error: 'userId, title, and content are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from('journal_entries')
      .insert([{ userId, title, content }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create journal entry' },
      { status: 500 }
    );
  }
}

// PUT update journal entry
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, content } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseServer
      .from('journal_entries')
      .update({
        title,
        content,
        updatedAt: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update journal entry' },
      { status: 500 }
    );
  }
}

// DELETE journal entry
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get('id');

    if (!entryId) {
      return NextResponse.json(
        { error: 'Entry ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from('journal_entries')
      .delete()
      .eq('id', entryId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete journal entry' },
      { status: 500 }
    );
  }
}
