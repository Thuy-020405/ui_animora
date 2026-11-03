import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer text-sm font-semibold select-none">
        <input
          type="checkbox"
          ref={ref}
          className={`w-4 h-4 rounded text-[var(--primary)] focus:ring-[var(--coral)] ${className}`}
          {...props}
        />
        <span>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
