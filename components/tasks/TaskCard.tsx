import React, { useState } from 'react';
import { Card, CardBody } from '../common/Card';
import { Badge } from '../common/Badge';
import { formatDate, isOverdue } from '../../utils/helpers';
import { Task } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { CheckCircle, Clock, Edit, Trash2, CheckCircle2 } from 'lucide-react';

type TaskCardProps = {
  task: Task;
  onEdit: (task: Task) => void;
};

export const TaskCard = ({ task, onEdit }: TaskCardProps) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleStatusChange = (status: 'todo' | 'in-progress' | 'completed') => {
    updateTask(task.id, { 
      status, 
      completed: status === 'completed' 
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#3B82F6';
    }
  };

  const getStatusClasses = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'todo':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const isTaskOverdue = isOverdue(task.dueDate, task.status);

  return (
    <Card 
      className={`transform transition-all duration-300 hover:shadow-md ${
        task.status === 'completed' ? 'opacity-80' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardBody>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`text-lg font-medium text-gray-900 dark:text-white mb-1 ${
              task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}>
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{task.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs px-2.5 py-0.5 rounded-full ${getStatusClasses()}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
              </span>
              
              <span 
                className="text-xs px-2.5 py-0.5 rounded-full text-white"
                style={{ backgroundColor: getPriorityColor() }}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
              </span>
              
              {isTaskOverdue && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                  Overdue
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map(tag => (
                <Badge key={tag.id} text={tag.name} color={tag.color} />
              ))}
            </div>
          </div>
          
          <div className={`flex flex-col space-y-2 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button 
              onClick={() => onEdit(task)}
              className="p-1 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-100 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={handleDelete}
              className="p-1 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-100 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {task.dueDate ? (
              <span className={isTaskOverdue ? 'text-red-600 dark:text-red-400' : ''}>
                Due: {formatDate(task.dueDate)}
              </span>
            ) : (
              'No due date'
            )}
          </div>
          
          <div className="flex space-x-2">
            {task.status !== 'todo' && (
              <button
                onClick={() => handleStatusChange('todo')}
                className="p-1.5 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700"
                title="Mark as To Do"
              >
                <Clock size={16} />
              </button>
            )}
            
            {task.status !== 'in-progress' && (
              <button
                onClick={() => handleStatusChange('in-progress')}
                className="p-1.5 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-100 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                title="Mark as In Progress"
              >
                <CheckCircle size={16} />
              </button>
            )}
            
            {task.status !== 'completed' && (
              <button
                onClick={() => handleStatusChange('completed')}
                className="p-1.5 rounded-full text-gray-500 hover:text-green-500 hover:bg-green-100 dark:text-gray-400 dark:hover:text-green-400 dark:hover:bg-green-900/30"
                title="Mark as Completed"
              >
                <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};