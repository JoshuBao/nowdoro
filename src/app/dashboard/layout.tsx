// src/app/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import React from 'react';
import { createClient } from '../../../test/my-app/utils/supabase/server';


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
      <div className="w-full max-w-4xl mx-auto p-6 rounded-lg">
        <h1 className="text-5xl font-bold mb-6 text-center text-primary">Dashboard</h1>
        {children}
      </div>
    </div>
  );
}
