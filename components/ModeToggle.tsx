
import React from 'react';
import { SunIcon, MoonIcon } from './Icons';

interface ModeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="fixed top-4 right-4 z-50 w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
    aria-label="Toggle theme"
  >
    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
  </button>
);
