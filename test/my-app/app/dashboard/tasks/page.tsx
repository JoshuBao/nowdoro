'use client';

import React from 'react';
import AddTaskForm from '@/components/AddTaskForm';
import TaskListItem from '@/components/TaskListItem';
import { useTasks } from '@/context/TaskContext';
import Link from 'next/link';

const Tasks: React.FC = () => {
  const { tasks } = useTasks();

  return (
      <div className="min-h-screen flex flex-col p-4">
        <h1 className="text-3xl text-neutral font-bold mb-4">Tasks</h1>
        <AddTaskForm />
        <div className="mt-4 space-y-4">
          {tasks.map(task => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </div>
        <Link href="/dashboard" className="btn btn-secondary mt-4">Back to Dashboard</Link>
      </div>
  );
};

export default Tasks;
