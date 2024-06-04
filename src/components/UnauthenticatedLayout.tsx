'use client';

import React from 'react';

const UnauthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      {children}
    </main>
  );
};

export default UnauthenticatedLayout;
