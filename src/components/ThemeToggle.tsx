'use client';

import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<'mytheme' | 'dark' | 'light'>('mytheme');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'mytheme') return 'dark';
      if (prevTheme === 'dark') return 'light';
      return 'mytheme';
    });
  };

  return (
    <button onClick={toggleTheme} className="btn btn-secondary">
      {theme === 'mytheme' ? 'Switch to Dark Mode' : theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Custom Theme'}
    </button>
  );
};

export default ThemeToggle;
