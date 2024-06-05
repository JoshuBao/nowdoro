// No text nodes or whitespace between tags
import React from 'react';
import { Inter } from 'next/font/google';
import { TaskProvider } from '@/context/TaskContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Time Tracker',
  description: 'Manage your tasks efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={`${inter.className} bg-base-100`}>
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
