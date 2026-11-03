import React from 'react';

export interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[var(--surface-2)]/30 rounded-2xl border border-[var(--border)]">
      <div className="text-4xl mb-3">🐾</div>
      <h3 className="text-lg font-bold text-[var(--primary)] font-heading">{title}</h3>
      {description && <p className="text-sm text-[var(--text-muted)] mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};
