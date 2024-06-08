// src/components/TableSummary.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks, eachDayOfInterval, differenceInMinutes, formatISO } from 'date-fns';
import { useTasks } from '@/context/TaskContext';
import { fetchWeekTaskSessions, fetchTasks } from '@/utils/supabase/supabaseService';
import { TaskSession, Task } from '@/types';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

const TableSummary: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const [taskSessions, setTaskSessions] = useState<TaskSession[]>([]);
  const [currentWeek, setCurrentWeek] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [loading, setLoading] = useState<boolean>(true);

  const weekDays = eachDayOfInterval({
    start: startOfWeek(currentWeek, { weekStartsOn: 0 }),
    end: endOfWeek(currentWeek, { weekStartsOn: 0 }),
  });

  useEffect(() => {
    const fetchSessionsForWeek = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      if (userId) {
        const tasks = await fetchTasks(userId);
        setTasks(tasks ?? []);

        const start = formatISO(startOfWeek(currentWeek, { weekStartsOn: 0 }));
        const end = formatISO(endOfWeek(currentWeek, { weekStartsOn: 0 }));

        const sessions = await fetchWeekTaskSessions(userId, start, end);
        setTaskSessions(sessions ?? []);
      }

      setLoading(false);
    };

    fetchSessionsForWeek();
  }, [currentWeek, setTasks]);

  const getTotalTimeForTask = (taskId: string, date: Date) => {
    const sessionsForDay = taskSessions.filter(session =>
      session.task_id === taskId &&
      new Date(session.start_time).toDateString() === date.toDateString()
    );

    const totalMinutes = sessionsForDay.reduce((total, session) => {
      const startTime = new Date(session.start_time);
      const endTime = session.end_time ? new Date(session.end_time) : new Date();
      return total + differenceInMinutes(endTime, startTime);
    }, 0);

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours} hrs ${minutes} mins`;
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(prevWeek => subWeeks(prevWeek, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeek(prevWeek => addWeeks(prevWeek, 1));
  };

  const handleCurrentWeek = () => {
    setCurrentWeek(startOfWeek(new Date(), { weekStartsOn: 0 }));
  };

  return (
    <div className="p-4 bg-base-300 shadow-md my-4">
      <div className="flex justify-between items-center mb-4">
        <button className="btn btn-secondary" onClick={handlePreviousWeek}>Previous Week</button>
        <h2 className="text-2xl font-bold text-primary">Week of {format(startOfWeek(currentWeek, { weekStartsOn: 0 }), 'MMMM d, yyyy')}</h2>
        <button className="btn btn-secondary" onClick={handleNextWeek}>Next Week</button>
        <button className="btn btn-primary" onClick={handleCurrentWeek}>Current Week</button>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-neutral">
            <thead>
              <tr>
                <th>Task</th>
                {weekDays.map((date, index) => (
                  <th key={index}>{format(date, 'EEE')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  {weekDays.map((date, index) => (
                    <td key={index}>{getTotalTimeForTask(task.id, date)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableSummary;
