import React from 'react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { useTaskContext } from '../../context/TaskContext';
import { formatDate, isOverdue } from '../../utils/helpers';
import { Task } from '../../types';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../common/Button';

export const RecentTasks = () => {
  const { tasks, updateTask } = useTaskContext();
  
  // Get 5 most recent tasks
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);
    
  const handleComplete = (task: Task) => {
    updateTask(task.id, { status: 'completed', completed: true });
  };
  
  const handleProgress = (task: Task) => {
    updateTask(task.id, { status: 'in-progress', completed: false });
  };

  if (recentTasks.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Tasks</h2>
        </CardHeader>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create a new task to get started!</p>
            <Button 
              variant="primary"
              className="mt-4"
              onClick={() => window.history.pushState({}, '', '/tasks')}
            >
              Create Task
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Tasks</h2>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentTasks.map(task => {
            const isTaskOverdue = isOverdue(task.dueDate, task.status);
            
            return (
              <li key={task.id} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium text-gray-900 dark:text-white ${
                      task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''
                    }`}>
                      {task.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <span 
                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          task.status === 'completed' 
                            ? 'bg-green-500' 
                            : task.status === 'in-progress' 
                              ? 'bg-blue-500' 
                              : 'bg-gray-500'
                        }`} 
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {task.status === 'completed' 
                          ? 'Completed' 
                          : task.status === 'in-progress' 
                            ? 'In Progress' 
                            : 'To Do'
                        }
                      </p>
                      
                      {isTaskOverdue && (
                        <div className="flex items-center ml-3 text-red-500 dark:text-red-400">
                          <AlertTriangle size={12} className="mr-1" />
                          <span className="text-xs">Overdue</span>
                        </div>
                      )}
                      
                      {task.dueDate && (
                        <p className={`text-xs ml-3 ${
                          isTaskOverdue ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          Due: {formatDate(task.dueDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    {task.status !== 'completed' && (
                      <button
                        onClick={() => handleComplete(task)}
                        title="Mark as completed"
                        className="p-1 ml-2 text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-400"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    {task.status === 'todo' && (
                      <button
                        onClick={() => handleProgress(task)}
                        title="Mark as in progress"
                        className="p-1 ml-2 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        <Clock size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        
        {tasks.length > 5 && (
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
            <a
              href="/tasks"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/tasks');
                window.dispatchEvent(new Event('popstate'));
              }}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all tasks
            </a>
          </div>
        )}
      </CardBody>
    </Card>
  );
};