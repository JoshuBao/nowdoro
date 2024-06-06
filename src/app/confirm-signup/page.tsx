// src/app/confirm-signup/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function ConfirmSignupPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const type = searchParams.get('type') as 'magiclink' | 'signup';
  const email = searchParams.get('email');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmSignup = async () => {
      if (token && type && email) {
        const { data, error } = await supabase.auth.verifyOtp({ token, type, email });
        if (error) {
          console.error('Error confirming magic link:', error);
          setError('Error confirming magic link');
        } else {
          console.log('Session data:', data);
          setConfirmed(true);
        }
      }
    };

    confirmSignup();
  }, [token, type, email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary">Confirm Signup</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {confirmed ? (
          <div className="alert alert-success">
            <div>
              <span>Your signup has been confirmed. You can now log in.</span>
            </div>
          </div>
        ) : (
          <div className="text-center">Processing...</div>
        )}
      </div>
    </div>
  );
}
