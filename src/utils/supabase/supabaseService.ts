// src/utils/supabase/supabaseService.ts
import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskSession } from '@/types';
import { endOfDay, formatISO, startOfDay } from 'date-fns';

const supabase = createClient();

export const addTask = async (task: Omit<Task, 'id' | 'user_id'>, userId: string) => {
  const newTask = {
    ...task,
    id: uuidv4(),
    elapsedTime: 0,
    isRunning: false,
    user_id: userId,
  };

  const { data, error } = await supabase
    .from('tasks')
    .insert(newTask)
    .select('*')
    .single();

  if (error) {
    console.error('Error adding task:', error);
  }
  return data;
};

export const updateTask = async (updatedTask: Task) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updatedTask)
    .eq('id', updatedTask.id)
    .select('*')
    .single();

  if (error) {
    console.error('Error updating task:', error);
  }
  return data;
};

export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting task:', error);
  }
};

export const startTaskSession = async (taskId: string, userId: string) => {
  const newSession = {
    id: uuidv4(),
    task_id: taskId,
    user_id: userId,
    start_time: new Date().toISOString(),
    end_time: null,
  };
  console.log(`Starting task session for task ${taskId} and user ${userId}`);

  const { data, error } = await supabase
    .from('task_sessions')
    .insert(newSession)
    .select('*')
    .single();

  if (error) {
    console.error('Error starting task session:', error);
  }
  return data;
};

export const endTaskSession = async (sessionId: string) => {
  const { data, error } = await supabase
    .from('task_sessions')
    .update({ end_time: new Date().toISOString() })
    .eq('id', sessionId)
    .select('*')
    .single();

  if (error) {
    console.error('Error ending task session:', error);
  }
  return data;
};

export const fetchUserTasks = async (): Promise<Task[]> => {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;

  if (userId) {
    const tasks = await fetchTasks(userId);
    return tasks ?? [];
  }

  return [];
};

export const fetchTasks = async (userId: string): Promise<Task[]> => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching tasks:', error);
  }
  return data ?? [];
};

export const fetchTodayTaskSessions = async (userId: string) => {
  const start = formatISO(startOfDay(new Date()));
  const end = formatISO(endOfDay(new Date()));

  const { data, error } = await supabase
    .from('task_sessions')
    .select('*, task:tasks(id, name, description)')
    .eq('user_id', userId)
    .gte('start_time', start)
    .lte('end_time', end)
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Error fetching today task sessions:', error);
  }
  return data ?? [];
};
export const subscribeToTaskSessions = (userId: string, callback: (newSession: TaskSession & { task: Task }) => void) => {
  const channel = supabase
    .channel(`public:task_sessions:user_id=eq.${userId}`)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'task_sessions', filter: `user_id=eq.${userId}` }, async (payload) => {
      const newSession: TaskSession = payload.new as TaskSession;

      // Fetch task details
      const { data: taskData, error } = await supabase
        .from('tasks')
        .select('id, name, description')
        .eq('id', newSession.task_id)
        .single();

      if (error) {
        console.error('Error fetching task details:', error);
        return;
      }

      const task: Task = {
        ...taskData,
        elapsedTime: 0,
        isRunning: false,
        user_id: newSession.user_id,
      };

      callback({ ...newSession, task });
    })
    .subscribe();

  return channel;
};

export const fetchWeekTaskSessions = async (userId: string, start: string, end: string) => {
  const { data, error } = await supabase
    .from('task_sessions')
    .select('*, task:tasks(id, name, description)')
    .eq('user_id', userId)
    .gte('start_time', start)
    .lte('end_time', end)
    .order('start_time', { ascending: true });

  if (error) {
    console.error('Error fetching task sessions for the week:', error);
  }
  return data ?? [];
};