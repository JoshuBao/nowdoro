'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function SignInPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = '/dashboard';
      }
    };
    fetchUser();
  }, [supabase.auth]);

  const handleCheckout = async () => {
    setLoading(true);
    try {

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `http://${process.env.NEXT_PUBLIC_DOMAIN}/auth/callback`, 
        shouldCreateUser: false,
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
    <div className="min-h-screen flex items-center justify-center bg-base-300">
      {loading ? (
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4 text-base-content text-center">Loading...</p>
          <div className="modal-action">

          </div>
        </div>
      ) : (

        <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-2xl shadow-lg">

          <h2 className="text-2xl font-bold text-center text-primary">Sign In</h2>

          {emailSent ? (
            <div className="text-center">
              <p className="text-success">Magic link sent to {email}. Check your email to sign in.</p>
            </div>
          ) : (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div className="form-control">
                <p className="text-base-content text-sm">No account? <a onClick={handleCheckout} className="link text-blue-300">Sign Up</a></p>
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
                <button type="submit" className="btn border border-primary rounded-full w-auto">
                  Get Magic Link
                </button>
                <p className="text-info text-sm my-2">A link will get sent to your email to sign in.</p>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}


