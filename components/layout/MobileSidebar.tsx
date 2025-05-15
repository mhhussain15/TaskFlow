import React, { useEffect } from 'react';
import { X, LayoutDashboard } from 'lucide-react';
import { useTaskContext } from '../../context/TaskContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { NavLink } from '../common/NavLink';
import { 
  CheckSquare, 
  Clock, 
  ListTodo, 
  Calendar, 
  Tag, 
  BarChart2 
} from 'lucide-react';

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { taskStats } = useTaskContext();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-sidebar')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      <aside 
        className={`mobile-sidebar fixed top-0 left-0 w-64 h-full bg-white dark:bg-gray-800 z-30 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <LayoutDashboard className="h-7 w-7 text-blue-500 mr-2" />
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskFlow</h1>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2">
              <NavLink to="/" icon={<BarChart2 size={20} />} label="Dashboard" onClick={onClose} />
              <NavLink to="/tasks" icon={<ListTodo size={20} />} label="Tasks" count={taskStats.total} onClick={onClose} />
              <NavLink 
                to="/tasks?status=in-progress" 
                icon={<Clock size={20} />} 
                label="In Progress" 
                count={taskStats.inProgress}
                onClick={onClose}
              />
              <NavLink 
                to="/tasks?status=completed" 
                icon={<CheckSquare size={20} />} 
                label="Completed" 
                count={taskStats.completed}
                onClick={onClose}
              />
              <NavLink to="/calendar" icon={<Calendar size={20} />} label="Calendar" onClick={onClose} />
              <NavLink to="/tags" icon={<Tag size={20} />} label="Tags" onClick={onClose} />
            </ul>
          </nav>
          
          <div className="mt-auto space-y-4">
            <ThemeToggle />
            <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
              Developed by Mohd. Hamza Hussain
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};