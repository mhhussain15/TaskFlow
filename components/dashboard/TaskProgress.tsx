import React, { useMemo } from 'react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { useTaskContext } from '../../context/TaskContext';

export const TaskProgress = () => {
  const { taskStats } = useTaskContext();
  
  const completionPercentage = useMemo(() => {
    return taskStats.total > 0 
      ? Math.round((taskStats.completed / taskStats.total) * 100) 
      : 0;
  }, [taskStats]);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Task Progress</h2>
      </CardHeader>
      <CardBody>
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Completion</span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-xs text-gray-500 dark:text-gray-400">To Do</p>
            <p className="text-lg font-bold text-gray-700 dark:text-gray-300">{taskStats.todo}</p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <p className="text-xs text-blue-600 dark:text-blue-400">In Progress</p>
            <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{taskStats.inProgress}</p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <p className="text-xs text-green-600 dark:text-green-400">Completed</p>
            <p className="text-lg font-bold text-green-700 dark:text-green-300">{taskStats.completed}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};