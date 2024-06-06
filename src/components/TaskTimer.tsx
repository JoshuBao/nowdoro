'use client';

import React from 'react';
import { useTasks } from '@/context/TaskContext';

interface TaskTimerProps {
  taskId: string;
  initialTime: number;
  isRunning: boolean;
}

const TaskTimer: React.FC<TaskTimerProps> = ({ taskId, initialTime, isRunning }) => {
  const { toggleTaskRunning, updateTask, tasks } = useTasks();

  const task = tasks.find(task => task.id === taskId);

  const resetTask = () => {
    if (task) {
      updateTask({ ...task, elapsedTime: 0, isRunning: false });
    }
  };

  return (
    <div>
      <div className="text-2xl text-neutral font-mono">{new Date(initialTime * 1000).toISOString().substr(11, 8)}</div>
      <div className="mt-2">
        <button className="btn btn-primary mr-2" onClick={() => toggleTaskRunning(taskId)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-secondary" onClick={resetTask}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TaskTimer;
