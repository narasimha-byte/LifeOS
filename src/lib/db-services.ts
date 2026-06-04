import { supabaseServer } from './supabase';

// User utilities
export const userServices = {
  async getUser(userId: string) {
    const { data, error } = await supabaseServer
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  async createUser(name: string, email: string) {
    const { data, error } = await supabaseServer
      .from('users')
      .insert([{ name, email }])
      .select()
      .single();
    return { data, error };
  },

  async getUserStats(userId: string) {
    const [tasksRes, goalsRes, habitsRes] = await Promise.all([
      supabaseServer.from('tasks').select('*').eq('userId', userId),
      supabaseServer.from('goals').select('*').eq('userId', userId),
      supabaseServer.from('habits').select('*').eq('userId', userId),
    ]);

    return {
      totalTasks: tasksRes.data?.length || 0,
      completedTasks: tasksRes.data?.filter((t: any) => t.completed).length || 0,
      totalGoals: goalsRes.data?.length || 0,
      totalHabits: habitsRes.data?.length || 0,
    };
  },
};

// Goal utilities
export const goalServices = {
  async getGoals(userId: string) {
    const { data, error } = await supabaseServer
      .from('goals')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    return { data, error };
  },

  async getGoalProgress(userId: string) {
    const { data, error } = await supabaseServer
      .from('goals')
      .select('progress')
      .eq('userId', userId);

    if (!data) return 0;
    const avg = data.reduce((sum: number, g: any) => sum + (g.progress || 0), 0) / data.length;
    return Math.round(avg);
  },
};

// Habit utilities
export const habitServices = {
  async getHabits(userId: string) {
    const { data, error } = await supabaseServer
      .from('habits')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    return { data, error };
  },

  async logHabit(habitId: string, completedDate: string) {
    const { data, error } = await supabaseServer
      .from('habit_logs')
      .insert([{ habitId, completedDate }])
      .select()
      .single();
    return { data, error };
  },

  async getHabitLogs(habitId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabaseServer
      .from('habit_logs')
      .select('*')
      .eq('habitId', habitId)
      .gte('completedDate', startDate.toISOString().split('T')[0]);

    return { data, error };
  },
};

// Task utilities
export const taskServices = {
  async getTasks(userId: string) {
    const { data, error } = await supabaseServer
      .from('tasks')
      .select('*')
      .eq('userId', userId)
      .order('dueDate', { ascending: true });
    return { data, error };
  },

  async getTasksByPriority(userId: string, priority: string) {
    const { data, error } = await supabaseServer
      .from('tasks')
      .select('*')
      .eq('userId', userId)
      .eq('priority', priority);
    return { data, error };
  },

  async getTasksCompleted(userId: string) {
    const { data, error } = await supabaseServer
      .from('tasks')
      .select('*')
      .eq('userId', userId)
      .eq('completed', true);
    return { data, error };
  },

  async getTaskStats(userId: string) {
    const { data, error } = await supabaseServer
      .from('tasks')
      .select('completed, priority')
      .eq('userId', userId);

    if (!data) return { total: 0, completed: 0, pending: 0 };

    return {
      total: data.length,
      completed: data.filter((t: any) => t.completed).length,
      pending: data.filter((t: any) => !t.completed).length,
    };
  },
};

// Timetable utilities
export const timetableServices = {
  async getTimetable(userId: string) {
    const { data, error } = await supabaseServer
      .from('timetable')
      .select('*')
      .eq('userId', userId)
      .order('startTime', { ascending: true });
    return { data, error };
  },

  async addTimetableEntry(userId: string, startTime: string, endTime: string, activity: string) {
    const { data, error } = await supabaseServer
      .from('timetable')
      .insert([{ userId, startTime, endTime, activity }])
      .select()
      .single();
    return { data, error };
  },
};

// Journal utilities
export const journalServices = {
  async getEntries(userId: string) {
    const { data, error } = await supabaseServer
      .from('journal_entries')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false });
    return { data, error };
  },

  async searchEntries(userId: string, query: string) {
    const { data, error } = await supabaseServer
      .from('journal_entries')
      .select('*')
      .eq('userId', userId)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`);
    return { data, error };
  },

  async getEntriesByMonth(userId: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1).toISOString().split('T')[0];
    const endDate = new Date(year, month, 0).toISOString().split('T')[0];

    const { data, error } = await supabaseServer
      .from('journal_entries')
      .select('*')
      .eq('userId', userId)
      .gte('createdAt', startDate)
      .lte('createdAt', endDate);

    return { data, error };
  },
};

// Analytics utilities
export const analyticsServices = {
  async getUserAnalytics(userId: string) {
    const [tasksStats, goalsStats, habitsStats] = await Promise.all([
      taskServices.getTaskStats(userId),
      goalServices.getGoalProgress(userId),
      habitServices.getHabits(userId),
    ]);

    const completionRate = tasksStats.total > 0 
      ? Math.round((tasksStats.completed / tasksStats.total) * 100)
      : 0;

    return {
      taskCompletion: completionRate,
      goalProgress: goalsStats,
      habitCount: habitsStats.data?.length || 0,
      totalHabits: habitsStats.data?.length || 0,
      timestamp: new Date(),
    };
  },
};
