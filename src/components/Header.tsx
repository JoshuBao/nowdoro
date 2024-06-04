'use client';

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-base-200 p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Task Time Tracker</Link>
        </h1>
        <nav>
          <Link href="/dashboard/tasks" className="btn btn-sm">Tasks</Link>
          <Link href="/dashboard/summary" className="btn btn-sm btn-primary ml-2">Summary</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
