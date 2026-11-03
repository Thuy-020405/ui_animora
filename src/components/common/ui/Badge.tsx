import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'pink' | 'coral' | 'primary';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'coral', className = '' }) => {
  const variantStyles = {
    pink: 'bg-[var(--pink)] text-[var(--primary)]',
    coral: 'bg-[var(--coral)] text-white',
    primary: 'bg-[var(--primary)] text-[var(--on-primary)]',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
