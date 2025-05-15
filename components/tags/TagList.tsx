import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Card, CardHeader, CardBody } from '../common/Card';
import { Tag } from '../../types';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Edit, Trash2, Plus } from 'lucide-react';
import { TagForm } from './TagForm';

export const TagList = () => {
  const { getTags, deleteTag } = useTaskContext();
  const [tags, setTags] = useState<Tag[]>(getTags());
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const refreshTags = () => {
    setTags(getTags());
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag? It will be removed from all tasks.')) {
      deleteTag(id);
      refreshTags();
    }
  };

  const handleAddNew = () => {
    setEditingTag(null);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTag(null);
    refreshTags();
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Tags</h2>
          <Button 
            variant="primary" 
            size="sm" 
            icon={<Plus size={16} />}
            onClick={handleAddNew}
          >
            Add Tag
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          {tags.length === 0 ? (
            <div className="px-6 py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No tags created yet.</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddNew}
                icon={<Plus size={16} />}
              >
                Create your first tag
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {tags.map(tag => (
                <li key={tag.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <div className="flex items-center">
                    <Badge text={tag.name} color={tag.color} />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(tag)}
                      className="p-1 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-100 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/30"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(tag.id)}
                      className="p-1 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-100 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-red-900/30"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4 p-4">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
              {editingTag ? 'Edit Tag' : 'Create New Tag'}
            </h2>
            <TagForm 
              tag={editingTag || undefined} 
              onSave={handleFormClose} 
              onCancel={handleFormClose} 
            />
          </div>
        </div>
      )}
    </>
  );
};