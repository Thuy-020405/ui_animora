import React from 'react';

export interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between w-full max-w-xl mx-auto my-6">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isCurrent = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={label} className="flex flex-col items-center flex-1 relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 transition-colors ${
                isCurrent
                  ? 'bg-[var(--primary)] text-[var(--on-primary)] ring-4 ring-[var(--pink)]/50'
                  : isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
              }`}
            >
              {isCompleted ? '✓' : stepNum}
            </div>
            <span
              className={`mt-2 text-xs text-center font-semibold ${
                isCurrent ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-muted)]'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
