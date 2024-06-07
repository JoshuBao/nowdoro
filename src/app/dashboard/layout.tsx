// src/app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import React from 'react';
import { createClient } from '@/utils/supabase/server';


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { session }} = await supabase.auth.getSession();
  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="w-full max-w-8xl mx-8 p-6 rounded-lg">
        <h1 className="text-5xl font-bold mb-6 text-primary">Dashboard</h1>
        {children}
      </div>
    </div>
  );
}
