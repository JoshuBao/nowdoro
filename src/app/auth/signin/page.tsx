'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function SignInPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    });

    if (error) {
      console.error('Error sending magic link:', error);
    } else {
      setEmailSent(true);
      console.log('Magic link sent to email', data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary">Sign In / Sign Up</h2>
        {emailSent ? (
          <div className="text-center">
            <p className="text-success">Magic link sent to {email}. Check your email to sign in.</p>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-bordered text-neutral w-full"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Get Magic Link
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}