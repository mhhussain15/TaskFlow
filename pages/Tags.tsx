import React from 'react';
import { Layout } from '../components/layout/Layout';
import { TagList } from '../components/tags/TagList';

export const Tags = () => {
  return (
    <Layout title="Manage Tags">
      <TagList />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">About Tags</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-3">
          Tags help you organize and categorize your tasks. You can add multiple tags to each task to make them easier to find and manage.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Create custom tags with different colors to visually distinguish between different types of tasks, projects, or priorities.
        </p>
      </div>
    </Layout>
  );
};