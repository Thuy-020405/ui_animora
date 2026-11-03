import React from 'react';

export interface PillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const Pill: React.FC<PillProps> = ({ label, active = false, onClick, icon, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${
        active
          ? 'bg-[var(--primary)] text-[var(--on-primary)] shadow-sm'
          : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border)]'
      } ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
