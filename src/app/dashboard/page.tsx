'use client';

import React from 'react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import AddTaskForm from '@/components/AddTaskForm';
import TaskListItem from '@/components/TaskListItem';
import { useTasks } from '@/context/TaskContext';

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen flex flex-col p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p>Total Tasks: {tasks.length}</p>
          <p>Total Time Spent: {new Date(tasks.reduce((acc, task) => acc + task.elapsedTime, 0) * 1000).toISOString().substr(11, 8)}</p>
        </div>
        <AddTaskForm />
        <div className="mt-4 space-y-4">
          {tasks.map(task => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
