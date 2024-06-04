'use client';

import React from 'react';
import Layout from '@/components/Layout';
import AddTaskForm from '@/components/AddTaskForm';
import TaskListItem from '@/components/TaskListItem';
import { useTasks } from '@/context/TaskContext';

const Dashboard: React.FC = () => {
  const { tasks } = useTasks();

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <AddTaskForm />
      {tasks.map(task => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </Layout>
  );
};

export default Dashboard;
