import React, { ReactNode } from 'react';

type NavLinkProps = {
  to: string;
  icon: ReactNode;
  label: string;
  count?: number;
  onClick?: () => void;
};

export const NavLink = ({ to, icon, label, count, onClick }: NavLinkProps) => {
  const isActive = window.location.pathname === to.split('?')[0];

  return (
    <li>
      <a
        href={to}
        onClick={(e) => {
          e.preventDefault();
          window.history.pushState({}, '', to);
          window.dispatchEvent(new Event('popstate'));
          if (onClick) onClick();
        }}
        className={`flex items-center p-2 rounded-md transition-colors duration-200 group ${
          isActive
            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <span className={`mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'}`}>
          {icon}
        </span>
        <span className="flex-1">{label}</span>
        {count !== undefined && (
          <span className={`px-2 py-1 rounded-full text-xs ${
            isActive 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}>
            {count}
          </span>
        )}
      </a>
    </li>
  );
};