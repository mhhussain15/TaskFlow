import React, { useState } from 'react';
import { Tag } from '../../types';
import { useTaskContext } from '../../context/TaskContext';
import { Button } from '../common/Button';

type TagFormProps = {
  tag?: Tag;
  onSave: () => void;
  onCancel: () => void;
};

const DEFAULT_COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
];

export const TagForm = ({ tag, onSave, onCancel }: TagFormProps) => {
  const { addTag, updateTask, tasks } = useTaskContext();
  const [name, setName] = useState(tag?.name || '');
  const [color, setColor] = useState(tag?.color || DEFAULT_COLORS[0]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    if (tag) {
      // Get all tasks with this tag
      const tasksWithTag = tasks.filter(t => 
        t.tags.some(tagItem => tagItem.id === tag.id)
      );
      
      // Update the tag in each task
      tasksWithTag.forEach(task => {
        updateTask(task.id, {
          tags: task.tags.map(t => 
            t.id === tag.id 
              ? { ...t, name, color } 
              : t
          )
        });
      });
      
      // Update the tag in the tags list
      addTag({ name, color });
    } else {
      addTag({ name, color });
    }
    
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="tagName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tag Name*
        </label>
        <input
          type="text"
          id="tagName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter tag name"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Tag Color
        </label>
        <div className="grid grid-cols-8 gap-2">
          {DEFAULT_COLORS.map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              className={`w-8 h-8 rounded-full border-2 ${
                color === colorOption ? 'border-gray-900 dark:border-white' : 'border-transparent'
              }`}
              style={{ backgroundColor: colorOption }}
              onClick={() => setColor(colorOption)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {tag ? 'Update Tag' : 'Create Tag'}
        </Button>
      </div>
    </form>
  );
};