'use client';

import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Welcome to Task Time Tracker</h1>
          <p className="py-6">Track your tasks and manage your time efficiently.</p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
