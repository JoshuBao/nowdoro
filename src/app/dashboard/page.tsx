'use client';

import React from 'react';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import TaskListItem from '@/components/TaskListItem';
import { useTasks } from '@/context/TaskContext';
import Link from 'next/link';

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const totalTimeSpent = tasks.reduce((acc, task) => acc + task.elapsedTime, 0);

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen flex flex-col p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Tasks</div>
              <div className="stat-value">{totalTasks}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Time Spent</div>
              <div className="stat-value">{new Date(totalTimeSpent * 1000).toISOString().substr(11, 8)}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          {tasks.map(task => (
            <TaskListItem key={task.id} task={task} />
          ))}
        </div>
        <Link href="/dashboard/tasks" className="btn btn-primary mt-4">Manage Tasks</Link>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;
