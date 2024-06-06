// src/components/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { supabase } from '@/utils/supabase/client';

const Header: React.FC<{ user: any }> = ({ user }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth/signin';
  };

  return (
    <header className="bg-base-300 w-full p-4 sticky left-0 top-0 right-0 z-20 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl text-primary font-bold">
          <Link href="/">Task Time Tracker</Link>
        </h1>
        <nav className="flex items-center">
          {user ? (
            <>
              <Link href="/dashboard" className="btn btn-sm mr-2">Dashboard</Link>
              <Link href="/dashboard/tasks" className="btn btn-sm btn-primary mr-2">Tasks</Link>
              <span className="mr-4">Welcome, {user.email}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/signin" className="btn btn-primary">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
