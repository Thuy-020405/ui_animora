import React from 'react';

export interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, error, required, children }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-bold text-[var(--text)]">
          {label} {required && <span className="text-[var(--coral)]">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
