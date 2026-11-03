import React from 'react';

export const ServiceDetail: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <div className="p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl">
      <h2 className="text-2xl font-bold font-heading text-[var(--primary)] mb-4">{title}</h2>
      <p className="text-base text-[var(--text)] leading-relaxed">{description}</p>
    </div>
  );
};
