'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { fetchTasks, addTask as supabaseAddTask, updateTask as supabaseUpdateTask, deleteTask as supabaseDeleteTask, startTaskSession as supabaseStartTaskSession, endTaskSession as supabaseEndTaskSession } from '@/utils/supabase/supabaseService';
import { Task, TaskSession } from '@/types';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

interface TaskContextType {
  tasks: Task[];
  taskSessions: TaskSession[];
  addTask: (task: Omit<Task, 'id' | 'user_id'>) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  startTaskSession: (taskId: string) => void;
  endTaskSession: (sessionId: string) => void;
  toggleTaskRunning: (taskId: string) => void;
  isOnBreak: boolean;
  breakTime: number;
  startBreak: () => void;
  endBreak: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskSessions, setTaskSessions] = useState<TaskSession[]>([]);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [breakTime, setBreakTime] = useState(0);

  useEffect(() => {
    const fetchUserTasks = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (userId) {
        const tasks = await fetchTasks(userId);
        setTasks(tasks ?? []); // Ensure setTasks always receives an array
      }
    };

    fetchUserTasks();
  }, []);

  const addTask = async (task: Omit<Task, 'id' | 'user_id'>) => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (userId) {
      const newTask = await supabaseAddTask(task, userId);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    const data = await supabaseUpdateTask(updatedTask);
    setTasks((prevTasks) => 
      prevTasks.map(task => task.id === updatedTask.id ? data : task)
    );
  };

  const deleteTask = async (id: string) => {
    await supabaseDeleteTask(id);
    setTasks((prevTasks) => 
      prevTasks.filter(task => task.id !== id)
    );
  };

  const startTaskSession = async (taskId: string) => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (userId) {
      const newSession = await supabaseStartTaskSession(taskId, userId);
      setTaskSessions((prevSessions) => [...prevSessions, newSession]);
    }
  };

  const endTaskSession = async (sessionId: string) => {
    const data = await supabaseEndTaskSession(sessionId);
    setTaskSessions((prevSessions) => 
      prevSessions.map(session => session.id === sessionId ? data : session)
    );
  };

  const toggleTaskRunning = async (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, isRunning: !task.isRunning } : task
      )
    );

    const task = tasks.find(task => task.id === taskId);

    if (task?.isRunning) {
      const activeSession = taskSessions.find(session => session.task_id === taskId && !session.end_time);
      if (activeSession) {
        await endTaskSession(activeSession.id);
      }
    } else {
      await startTaskSession(taskId);
    }
  };

  // Effect to handle running timers
  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.isRunning
            ? { ...task, elapsedTime: task.elapsedTime + 1 }
            : task
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, taskSessions, addTask, updateTask, deleteTask, startTaskSession, endTaskSession, toggleTaskRunning, isOnBreak: false, breakTime: 0, startBreak: () => {}, endBreak: () => {} }}>
      {children}
    </TaskContext.Provider>
  );
};
