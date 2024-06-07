'use client';

import React from 'react';
import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';
import { useTasks } from '@/context/TaskContext';
import Link from 'next/link';

const Tasks: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <div className="flex justify-center">
      <div className="min-h-screen flex flex-col p-4 w-1/2">
        <h1 className="text-3xl text-neutral font-bold mb-4">Tasks</h1>
        <AddTaskForm />
        <TaskList />
        <Link href="/dashboard" className="btn btn-secondary mt-4">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Tasks;
