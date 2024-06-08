'use client';

import React from 'react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-primary">Welcome to Task Time Tracker</h1>
          <p className="py-6 text-base-content">Track your tasks and manage your time efficiently.</p>
          <Link href="/dashboard">
            <button className="btn btn-primary">Go to Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
