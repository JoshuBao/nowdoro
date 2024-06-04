'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TaskTimerProps {
  taskId: string;
  initialTime: number;
  onUpdate: (id: string, elapsedTime: number) => void;
}

const TaskTimer: React.FC<TaskTimerProps> = ({ taskId, initialTime, onUpdate }) => {
  const [time, setTime] = useState(initialTime);
  const [running, setRunning] = useState(false);
  const prevTimeRef = useRef(time);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (prevTimeRef.current !== time) {
      onUpdate(taskId, time);
      prevTimeRef.current = time;
    }
  }, [time, taskId, onUpdate]);

  return (
    <div>
      <div className="text-2xl font-mono">{new Date(time * 1000).toISOString().substr(11, 8)}</div>
      <div className="mt-2">
        <button className="btn btn-primary mr-2" onClick={() => setRunning(!running)}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-secondary" onClick={() => setTime(0)}>Reset</button>
      </div>
    </div>
  );
};

export default TaskTimer;
