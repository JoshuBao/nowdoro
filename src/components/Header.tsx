// src/components/Header.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { createClient } from '@/utils/supabase/client';
import AccountButton from './AccountButton';
import { Sign } from 'crypto';

const Header: React.FC<{}> = () => {
  const supabase = createClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth/signin';
  };

  return (
    <header className="navbar bg-base-300 w-full sticky left-0 top-0 right-0 z-20 shadow">
      <div className="container mx-auto flex items-center">
        <nav className="flex items-center">
          <AccountButton />
          <Link href="/dashboard" className="btn btn-sm mr-2">Dashboard</Link>
          <Link href="/dashboard/tasks" className="btn btn-sm btn-primary mr-2">Tasks</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
