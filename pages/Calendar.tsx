import React from 'react';
import { Layout } from '../components/layout/Layout';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import { useTaskContext } from '../context/TaskContext';
import { Calendar as CalendarIcon } from 'lucide-react';

export const Calendar = () => {
  const { tasks } = useTaskContext();
  
  // Count tasks that have due dates
  const tasksWithDueDates = tasks.filter(task => task.dueDate !== null).length;

  return (
    <Layout title="Calendar View">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Task Calendar</h2>
        </CardHeader>
        <CardBody>
          <div className="flex flex-col items-center justify-center py-12">
            <CalendarIcon size={64} className="text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Calendar View Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-2">
              The calendar view is currently under development and will be available soon.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-md">
              You currently have {tasksWithDueDates} {tasksWithDueDates === 1 ? 'task' : 'tasks'} with due dates that will appear here.
            </p>
          </div>
        </CardBody>
      </Card>
    </Layout>
  );
};