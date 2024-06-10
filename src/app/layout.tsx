// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nowdoro',
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
          {children}
      </body>
    </html>
  );
}