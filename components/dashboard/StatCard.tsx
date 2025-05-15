import React, { ReactNode } from 'react';
import { Card, CardBody } from '../common/Card';

type StatCardProps = {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
};

export const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-300">
      <CardBody className="flex items-center">
        <div 
          className="flex items-center justify-center p-3 rounded-lg mr-4"
          style={{ backgroundColor: `${color}20` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
        </div>
      </CardBody>
    </Card>
  );
};