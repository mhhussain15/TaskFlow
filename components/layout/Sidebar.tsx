import React from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { 
  CheckSquare, 
  Clock, 
  ListTodo, 
  Calendar, 
  Tag, 
  BarChart2,
  LayoutDashboard
} from 'lucide-react';
import { NavLink } from '../common/NavLink';

export const Sidebar = () => {
  const { taskStats } = useTaskContext();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 transition-all duration-300">
      <div className="flex items-center mb-8">
        <LayoutDashboard className="h-8 w-8 text-blue-500 mr-2" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">TaskFlow</h1>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          <NavLink to="/" icon={<BarChart2 size={20} />} label="Dashboard" />
          <NavLink to="/tasks" icon={<ListTodo size={20} />} label="Tasks" count={taskStats.total} />
          <NavLink 
            to="/tasks?status=in-progress" 
            icon={<Clock size={20} />} 
            label="In Progress" 
            count={taskStats.inProgress} 
          />
          <NavLink 
            to="/tasks?status=completed" 
            icon={<CheckSquare size={20} />} 
            label="Completed" 
            count={taskStats.completed} 
          />
          <NavLink to="/calendar" icon={<Calendar size={20} />} label="Calendar" />
          <NavLink to="/tags" icon={<Tag size={20} />} label="Tags" />
        </ul>
      </nav>
      
      <div className="mt-auto space-y-4">
        <ThemeToggle />
        <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-200 dark:border-gray-700">
          Developed by Mohd. Hamza Hussain
        </div>
      </div>
    </aside>
  );
};