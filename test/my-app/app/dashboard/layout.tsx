// src/app/dashboard/layout.tsx
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="w-full max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-primary">Dashboard</h1>
        {children}
      </div>
    </div>
  );
}
