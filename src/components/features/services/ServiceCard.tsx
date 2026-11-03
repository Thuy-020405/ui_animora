import React from 'react';

export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: string;
  onClick?: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon = '🐾', onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--coral)] cursor-pointer transition-all hover:shadow-lg"
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-[var(--primary)] font-heading mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] line-clamp-3">{description}</p>
    </div>
  );
};
