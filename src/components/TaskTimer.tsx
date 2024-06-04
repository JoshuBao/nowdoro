'use client';

import React from 'react';
import { useTasks } from '@/context/TaskContext';

interface TaskTimerProps {
  taskId: string;
  initialTime: number;
  isRunning: boolean;
}

const TaskTimer: React.FC<TaskTimerProps> = ({ taskId, initialTime, isRunning }) => {
  const { toggleTaskRunning, updateTask } = useTasks();

  return (
    <div>
      <div className="text-2xl font-mono">{new Date(initialTime * 1000).toISOString().substr(11, 8)}</div>
      <div className="mt-2">
        <button className="btn btn-primary mr-2" onClick={() => toggleTaskRunning(taskId)}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-secondary" onClick={() => updateTask({ id: taskId, elapsedTime: 0, isRunning: false, name: '', description: '' })}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default TaskTimer;
