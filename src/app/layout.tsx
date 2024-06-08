// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { TaskProvider } from '@/context/TaskContext';
import './globals.css';
import Header from '@/components/Header';
import { createClient } from '@/utils/supabase/client';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Time Tracker',
  description: 'Manage your tasks efficiently',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="nord">
      <body className={`${inter.className} bg-base-100`}>
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
