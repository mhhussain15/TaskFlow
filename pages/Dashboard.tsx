import React from 'react';
import { Layout } from '../components/layout/Layout';
import { useTaskContext } from '../context/TaskContext';
import { StatCard } from '../components/dashboard/StatCard';
import { TaskProgress } from '../components/dashboard/TaskProgress';
import { RecentTasks } from '../components/dashboard/RecentTasks';
import { CheckSquare, Clock, AlertTriangle, Calendar } from 'lucide-react';

export const Dashboard = () => {
  const { taskStats } = useTaskContext();

  return (
    <Layout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Tasks"
          value={taskStats.total}
          icon={<CheckSquare size={24} />}
          color="#3B82F6" // blue
        />
        <StatCard
          title="In Progress"
          value={taskStats.inProgress}
          icon={<Clock size={24} />}
          color="#0D9488" // teal
        />
        <StatCard
          title="Completed"
          value={taskStats.completed}
          icon={<CheckSquare size={24} />}
          color="#10B981" // green
        />
        <StatCard
          title="Overdue"
          value={taskStats.overdue}
          icon={<AlertTriangle size={24} />}
          color="#EF4444" // red
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TaskProgress />
          <div className="hidden lg:block">
            {/* Future Widget: Calendar Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Upcoming Tasks</h2>
                <a 
                  href="/calendar"
                  onClick={(e) => {
                    e.preventDefault();
                    window.history.pushState({}, '', '/calendar');
                    window.dispatchEvent(new Event('popstate'));
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
                >
                  <Calendar size={14} className="mr-1" />
                  View Calendar
                </a>
              </div>
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <Calendar size={48} className="mx-auto mb-2 opacity-30" />
                <p>Calendar view will be available soon!</p>
              </div>
            </div>
          </div>
        </div>
        
        <RecentTasks />
      </div>
    </Layout>
  );
};