import React from 'react';

export const OrderTimeline: React.FC<{ steps: Array<{ title: string; date?: string; active: boolean }> }> = ({ steps }) => {
  return (
    <div className="flex justify-between items-center w-full my-4">
      {steps.map((s, idx) => (
        <div key={s.title} className="flex flex-col items-center flex-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${s.active ? 'bg-[var(--primary)] text-[var(--on-primary)]' : 'bg-[var(--surface-2)] text-[var(--text-muted)]'}`}>
            {idx + 1}
          </div>
          <span className="text-xs font-semibold mt-1 text-center">{s.title}</span>
        </div>
      ))}
    </div>
  );
};
