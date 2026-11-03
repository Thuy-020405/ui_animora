import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return <div className={`bg-[var(--surface-2)] animate-pulse rounded-lg ${className}`} />;
};
