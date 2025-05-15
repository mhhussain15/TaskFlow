import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className="flex items-center px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-700 transition-colors duration-300">
      <button
        onClick={toggleTheme}
        className="flex items-center justify-between w-full focus:outline-none"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
        </span>
        {theme === 'dark' ? (
          <Moon size={18} className="text-gray-400" />
        ) : (
          <Sun size={18} className="text-yellow-500" />
        )}
      </button>
    </div>
  );
};