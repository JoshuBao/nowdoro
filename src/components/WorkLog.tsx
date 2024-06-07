// src/components/WorkLog.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { fetchTodayTaskSessions, fetchUserTasks, subscribeToTaskSessions } from '@/utils/supabase/supabaseService';
import { useTasks } from '@/context/TaskContext';
import { TaskSession, Task } from '@/types';
import { format } from 'date-fns';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

const WorkLog: React.FC = () => {
  const [taskSessions, setTaskSessions] = useState<TaskSession[]>([]);
  const { tasks, setTasks } = useTasks();

  useEffect(() => {
    const fetchSessions = async () => {
      const userTasks: Task[] | null = await fetchUserTasks();
      if (userTasks) {
        setTasks(userTasks);
        const userId = userTasks[0]?.user_id;
        if (userId) {
          const sessions: TaskSession[] | null = await fetchTodayTaskSessions(userId);
          setTaskSessions(sessions ?? []);

          const subscription = subscribeToTaskSessions(userId, (newSession) => {
            setTaskSessions((prevSessions) => {
              const existingIndex = prevSessions.findIndex(session => session.id === newSession.id);
              if (existingIndex !== -1) {
                const updatedSessions = [...prevSessions];
                updatedSessions[existingIndex] = newSession;
                return updatedSessions;
              } else {
                return [...prevSessions, newSession];
              }
            });
          });

          return () => {
            supabase.removeChannel(subscription);
          };
        }
      }
    };

    fetchSessions();
  }, [setTasks]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-primary mb-4">Work Log for Today</h2>
      <div className="flex flex-col">
        {taskSessions.map((session) => (
          <div key={session.id} className="mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-white font-bold">{format(new Date(session.start_time), 'HH:mm')}</span>
              </div>
              <div className="flex-grow bg-base-200 p-4 rounded-lg shadow">
                <h3 className="font-bold text-lg">{session.task?.name}</h3>
                <p className="text-sm">{session.task?.description}</p>

                <p className="text-sm">{`From: ${format(new Date(session.start_time), 'HH:mm')} To: ${session.end_time ? format(new Date(session.end_time), 'HH:mm') : 'Ongoing'}`}</p>
              </div>
            </div>
            <div className="h-8 border-l-2 border-secondary ml-5"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkLog;
