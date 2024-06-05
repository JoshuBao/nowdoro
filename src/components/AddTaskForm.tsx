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
      id: Math.random().toString(36).substring(2, 9),
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
    <form onSubmit={handleSubmit} className="mb-4 bg-base-100 p-6 rounded-lg shadow-lg">
      <div className="mb-4">
        <label htmlFor="task-name" className="block text-neutral text-sm font-bold mb-2">Task Name</label>
        <input
          id="task-name"
          name="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full bg-neutral text-neutral-content"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="task-description" className="block text-neutral text-sm font-bold mb-2">Task Description</label>
        <textarea
          id="task-description"
          name="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full bg-neutral text-neutral-content"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-full">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
