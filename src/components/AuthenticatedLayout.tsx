'use client';

import React from 'react';
import Header from '@/components/Header';

const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>
    </>
  );
};

export default AuthenticatedLayout;
