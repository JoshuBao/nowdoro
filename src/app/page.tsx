'use client';

import React from 'react';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  return (
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Task Time Tracker</h1>
        <p className="text-lg mb-4">Track your tasks and manage your time efficiently.</p>
        <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
      </div>
  );
};

export default LandingPage;
