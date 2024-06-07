// src/components/BreakComponent.tsx
'use client';

import React from 'react';
import { useTasks } from '@/context/TaskContext';

const BreakComponent: React.FC = () => {
  const { isOnBreak, breakTime, startBreak, endBreak } = useTasks();

  return (
    <div className="w-1/4">
      <div className="flex flex-col items-center bg-accent card shadow-lg p-4">
        <h2 className="text-2xl text- font-bold mb-4">Break</h2>
        <div className="text-2xl text-neutral font-mono mb-4">
          {new Date(breakTime * 1000).toISOString().substr(11, 8)}
        </div>
        <button
          className={`btn ${isOnBreak ? 'btn-error' : 'btn-start'}`}
          onClick={isOnBreak ? endBreak : startBreak}
        >
          {isOnBreak ? 'End Break' : 'Start Break'}
        </button>
      </div>
    </div>
  );
};

export default BreakComponent;
