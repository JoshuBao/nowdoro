// src/utils/supabase/supabaseService.ts
import { createClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskSession } from '@/types';

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
  const { data, error } = await supabase
    .from('task_sessions')
    .insert({ task_id: taskId, user_id: userId, start_time: new Date().toISOString(), end_time: null })
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

export const fetchTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching tasks:', error);
  } 
  return data;
};
