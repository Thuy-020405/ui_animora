import React from 'react';

export interface StatusPillProps {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  label?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, label }) => {
  const styles = {
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300',
    confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300',
    completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300',
    cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300',
  };

  const defaultLabels = {
    pending: 'Chờ xác nhận',
    confirmed: 'Đã xác nhận',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${styles[status]}`}>
      {label || defaultLabels[status]}
    </span>
  );
};
