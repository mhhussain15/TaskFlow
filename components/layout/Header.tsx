import React, { useState } from 'react';
import { Menu, Search, X, Sun, Moon } from 'lucide-react';
import { useThemeContext } from '../../context/ThemeContext';

type HeaderProps = {
  toggleMobileSidebar: () => void;
  title: string;
};

export const Header = ({ toggleMobileSidebar, title }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center">
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden rounded-md p-2 mr-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">{title}</h1>
      </div>
      
      <div className="flex items-center">
        {isSearchOpen ? (
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full md:w-64 h-10 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" size={18} />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none mr-2"
          >
            <Search size={20} />
          </button>
        )}
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};