// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import SignOutButton from '@/components/SignOutButton';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      console.log('data', data);

      if (data?.session) {
        setUser(data?.session?.user || null);
      } else {
        window.location.href = "/auth/signin";
      }
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">

      {user ? (
        <div>
          <div className="text-center">
            <h2 className="text-lg text-black">Welcome, {user?.email}</h2>
            {/* <SignOutButton /> */}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-neutral">Loading...</p>
        </div>
      )}
    </div>
  );
}



