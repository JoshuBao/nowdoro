'use client';

import React from 'react';
import { useTasks } from '@/context/TaskContext';
import TaskTimer from './TaskTimer';

interface TaskListItemProps {
  task: {
    id: string;
    name: string;
    description: string;
    elapsedTime: number;
    isRunning: boolean;
  };
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const { deleteTask } = useTasks();

  return (
    <div className="card shadow-lg compact bg-base-100 p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="card-title">{task.name}</h2>
          <p className="text-sm text-gray-500">{task.description}</p>
          <TaskTimer taskId={task.id} initialTime={task.elapsedTime} isRunning={task.isRunning} />
        </div>
        <button className="btn btn-error btn-sm" onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskListItem;
