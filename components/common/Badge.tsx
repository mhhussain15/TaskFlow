import React from 'react';

type BadgeProps = {
  text: string;
  color: string;
  className?: string;
};

export const Badge = ({ text, color, className = '' }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{ backgroundColor: color, color: '#fff' }}
    >
      {text}
    </span>
  );
};