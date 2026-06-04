import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const hasBrowserClient = Boolean(supabaseUrl && supabaseAnonKey);
const hasServerClient = Boolean(supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey));

if (!hasBrowserClient || !hasServerClient) {
  console.warn('Supabase environment variables are not set. API routes may not function correctly.');
}

export const supabase = hasBrowserClient
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : ({} as any);

export const supabaseServer: any = hasServerClient
  ? createClient(supabaseUrl!, supabaseServiceRoleKey || supabaseAnonKey!)
  : ({} as any);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          email: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          createdAt?: string;
          updatedAt?: string;
        };
      };
      goals: {
        Row: {
          id: string;
          userId: string;
          title: string;
          description: string | null;
          targetDate: string | null;
          progress: number;
          status: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          userId: string;
          title: string;
          description?: string | null;
          targetDate?: string | null;
          progress?: number;
          status?: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          userId?: string;
          title?: string;
          description?: string | null;
          targetDate?: string | null;
          progress?: number;
          status?: string;
          updatedAt?: string;
        };
      };
      habits: {
        Row: {
          id: string;
          userId: string;
          name: string;
          streak: number;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          userId: string;
          name: string;
          streak?: number;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          userId?: string;
          name?: string;
          streak?: number;
          updatedAt?: string;
        };
      };
      habit_logs: {
        Row: {
          id: string;
          habitId: string;
          completedDate: string;
          createdAt: string;
        };
        Insert: {
          id?: string;
          habitId: string;
          completedDate: string;
          createdAt?: string;
        };
        Update: {
          id?: string;
          habitId?: string;
          completedDate?: string;
        };
      };
      tasks: {
        Row: {
          id: string;
          userId: string;
          title: string;
          description: string | null;
          priority: string;
          dueDate: string | null;
          completed: boolean;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          userId: string;
          title: string;
          description?: string | null;
          priority?: string;
          dueDate?: string | null;
          completed?: boolean;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          userId?: string;
          title?: string;
          description?: string | null;
          priority?: string;
          dueDate?: string | null;
          completed?: boolean;
          updatedAt?: string;
        };
      };
      timetable: {
        Row: {
          id: string;
          userId: string;
          startTime: string;
          endTime: string;
          activity: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          userId: string;
          startTime: string;
          endTime: string;
          activity: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          userId?: string;
          startTime?: string;
          endTime?: string;
          activity?: string;
          updatedAt?: string;
        };
      };
      journal_entries: {
        Row: {
          id: string;
          userId: string;
          title: string;
          content: string;
          createdAt: string;
          updatedAt: string;
        };
        Insert: {
          id?: string;
          userId: string;
          title: string;
          content: string;
          createdAt?: string;
          updatedAt?: string;
        };
        Update: {
          id?: string;
          userId?: string;
          title?: string;
          content?: string;
          updatedAt?: string;
        };
      };
    };
  };
};
