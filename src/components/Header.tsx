'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200 w-full p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Task Time Tracker</Link>
        </h1>
        <nav className="flex items-center">
          <Link href="/dashboard" className="btn btn-sm mr-2">Dashboard</Link>
          <Link href="/dashboard/tasks" className="btn btn-sm btn-primary mr-2">Tasks</Link>
          {/* <ThemeToggle /> */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
