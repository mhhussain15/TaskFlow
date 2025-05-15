import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskForm } from '../components/tasks/TaskForm';
import { Button } from '../components/common/Button';
import { useTaskContext } from '../context/TaskContext';
import { Task, Status } from '../types';
import { Plus, Filter } from 'lucide-react';

export const Tasks = () => {
  const { tasks, getTasksByStatus } = useTaskContext();
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get status from URL if any
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get('status') as Status | null;
    if (status) {
      setStatusFilter(status);
    }

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const status = params.get('status') as Status | null;
      setStatusFilter(status || 'all');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Filter tasks based on status
  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(getTasksByStatus(statusFilter));
    }
  }, [statusFilter, tasks, getTasksByStatus]);

  // Sort tasks
  useEffect(() => {
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      let aValue: any = a[sortBy as keyof Task];
      let bValue: any = b[sortBy as keyof Task];
      
      // Handle nulls
      if (aValue === null) return sortOrder === 'asc' ? -1 : 1;
      if (bValue === null) return sortOrder === 'asc' ? 1 : -1;
      
      // Date comparison
      if (sortBy === 'dueDate' || sortBy === 'createdAt') {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredTasks(sortedTasks);
  }, [sortBy, sortOrder]);

  const handleAddTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };
  
  const getStatusLabel = (status: Status | 'all') => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'all':
        return 'All Tasks';
      default:
        return 'All Tasks';
    }
  };

  const handleStatusChange = (status: Status | 'all') => {
    setStatusFilter(status);
    
    // Update URL
    const url = status === 'all' 
      ? '/tasks' 
      : `/tasks?status=${status}`;
    
    window.history.pushState({}, '', url);
    
    setIsFilterOpen(false);
  };

  return (
    <Layout title={getStatusLabel(statusFilter)}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="relative">
            <Button 
              variant="outline"
              icon={<Filter size={16} />}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="mr-2"
            >
              Filter
            </Button>
            
            {isFilterOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                <ul className="py-1">
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        statusFilter === 'all' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => handleStatusChange('all')}
                    >
                      All Tasks
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        statusFilter === 'todo' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => handleStatusChange('todo')}
                    >
                      To Do
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        statusFilter === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => handleStatusChange('in-progress')}
                    >
                      In Progress
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 ${
                        statusFilter === 'completed' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                      onClick={() => handleStatusChange('completed')}
                    >
                      Completed
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex items-center">
            <label htmlFor="sortBy" className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              Sort by:
            </label>
            <select
              id="sortBy"
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder as 'asc' | 'desc');
              }}
              className="text-sm border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-1 px-2"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="dueDate-asc">Due Date (Earliest)</option>
              <option value="dueDate-desc">Due Date (Latest)</option>
              <option value="priority-desc">Priority (High-Low)</option>
              <option value="priority-asc">Priority (Low-High)</option>
            </select>
          </div>
        </div>
        
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          onClick={handleAddTask}
        >
          Add Task
        </Button>
      </div>
      
      {filteredTasks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {statusFilter === 'all'
              ? "You don't have any tasks yet."
              : `You don't have any ${getStatusLabel(statusFilter).toLowerCase()} tasks.`}
          </p>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            onClick={handleAddTask}
          >
            Create a new task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={handleEditTask} />
          ))}
        </div>
      )}
      
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-lg w-full mx-4 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <TaskForm 
              task={editingTask || undefined} 
              onSave={handleFormClose} 
              onCancel={handleFormClose} 
            />
          </div>
        </div>
      )}
    </Layout>
  );
};