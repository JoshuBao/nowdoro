// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { TaskProvider } from '@/context/TaskContext';
import './globals.css';
import Header from '@/components/Header';
import { createClient } from '../../test/my-app/utils/supabase/server';
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
        <Header />
        <TaskProvider>
          {children}
        </TaskProvider>
      </body>
    </html>
  );
}
