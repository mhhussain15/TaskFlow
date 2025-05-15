export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

export const isOverdue = (dueDate: string | null, status: string): boolean => {
  if (!dueDate || status === 'completed') return false;
  return new Date(dueDate) < new Date() && status !== 'completed';
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-blue-500';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-500';
    case 'in-progress':
      return 'bg-blue-500';
    case 'todo':
      return 'bg-gray-500';
    default:
      return 'bg-gray-500';
  }
};