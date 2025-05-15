import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Task, TaskStats, Status, Priority, Tag } from '../types';
import { generateId } from '../utils/helpers';

type TaskContextType = {
  tasks: Task[];
  taskStats: TaskStats;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTasksByStatus: (status: Status) => Task[];
  getTags: () => Tag[];
  addTag: (tag: Omit<Tag, 'id'>) => void;
  deleteTag: (id: string) => void;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const defaultTags: Tag[] = [
  { id: '1', name: 'Work', color: '#3B82F6' },
  { id: '2', name: 'Personal', color: '#10B981' },
  { id: '3', name: 'Urgent', color: '#EF4444' },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [tags, setTags] = useState<Tag[]>(() => {
    const savedTags = localStorage.getItem('tags');
    return savedTags ? JSON.parse(savedTags) : defaultTags;
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags));
  }, [tags]);

  const calculateTaskStats = (): TaskStats => {
    const now = new Date();
    const stats: TaskStats = {
      total: tasks.length,
      completed: tasks.filter(task => task.status === 'completed').length,
      inProgress: tasks.filter(task => task.status === 'in-progress').length,
      todo: tasks.filter(task => task.status === 'todo').length,
      overdue: tasks.filter(task => {
        if (!task.dueDate || task.completed) return false;
        return new Date(task.dueDate) < now && task.status !== 'completed';
      }).length,
    };
    return stats;
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const getTasksByStatus = (status: Status) => {
    return tasks.filter(task => task.status === status);
  };

  const getTags = () => tags;

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: generateId(),
    };
    setTags(prevTags => [...prevTags, newTag]);
  };

  const deleteTag = (id: string) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
    
    // Remove tag from tasks
    setTasks(prevTasks => 
      prevTasks.map(task => ({
        ...task,
        tags: task.tags.filter(tag => tag.id !== id)
      }))
    );
  };

  const taskStats = calculateTaskStats();

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskStats,
        addTask,
        updateTask,
        deleteTask,
        getTasksByStatus,
        getTags,
        addTag,
        deleteTag,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};