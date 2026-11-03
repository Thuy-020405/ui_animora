import React from 'react';

export const WeightChart: React.FC<{ currentWeight: string }> = ({ currentWeight }) => {
  return (
    <div className="p-4 bg-[var(--surface-2)]/50 border border-[var(--border)] rounded-xl text-center">
      <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Cân nặng hiện tại</span>
      <p className="text-2xl font-bold font-heading text-[var(--primary)] mt-1">{currentWeight}</p>
    </div>
  );
};
