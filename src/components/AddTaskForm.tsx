'use client';

import React, { useState } from 'react';
import { useTasks } from '@/context/TaskContext';

const AddTaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      description,
      elapsedTime: 0,
      isRunning: false, 
    };
    addTask(newTask);
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="task-name" className="block text-sm font-bold mb-1">Task Name</label>
        <input
          id="task-name"
          name="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label htmlFor="task-description" className="block text-sm font-bold mb-1">Task Description</label>
        <textarea
          id="task-description"
          name="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
