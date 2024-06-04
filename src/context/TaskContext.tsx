'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface Task {
  id: string;
  name: string;
  description: string;
  elapsedTime: number;
  isRunning: boolean;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskRunning: (id: string) => void;
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

  const addTask = (task: Task) => setTasks((prevTasks) => [...prevTasks, task]);

  const updateTask = (updatedTask: Task) => setTasks((prevTasks) => 
    prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
  );

  const deleteTask = (id: string) => setTasks((prevTasks) => 
    prevTasks.filter(task => task.id !== id)
  );

  const toggleTaskRunning = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isRunning: !task.isRunning } : task
      )
    );
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
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskRunning }}>
      {children}
    </TaskContext.Provider>
  );
};
