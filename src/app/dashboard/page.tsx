'use client';

import React from 'react';
import AddTaskForm from '@/components/AddTaskForm';
import TaskListItem from '@/components/TaskListItem';
import { useTasks } from '@/context/TaskContext';
import Layout from '@/components/Layout';

const Dashboard: React.FC = () => {
    const { tasks } = useTasks();

    console.log('Current tasks:', tasks);

    return (
        <Layout>
            <div className="min-h-screen flex flex-col p-4">
                <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                <AddTaskForm />
                <div className="mt-4">
                    {tasks.map(task => (
                        <TaskListItem key={task.id} task={task} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
