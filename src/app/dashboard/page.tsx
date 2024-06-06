// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: {user}, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        console.log('User:', user);
        setUser(user || null);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-lg">
        {user ? (
          <div>
            <div className="text-center">
              <p className="text-lg">Welcome, {user.email}</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
