import React from 'react';
import { Vaccination } from '@/types';

export const HealthRecord: React.FC<{ vaccinations: Vaccination[] }> = ({ vaccinations }) => {
  return (
    <div className="space-y-2">
      {vaccinations.map((v) => (
        <div key={v.id} className="p-3 bg-[var(--surface-2)] rounded-xl flex justify-between items-center text-xs">
          <div>
            <span className="font-bold text-[var(--primary)]">{v.vaccineName}</span>
            <p className="text-[var(--text-muted)]">Ngày: {v.date}</p>
          </div>
          <span className="text-[var(--coral)] font-semibold uppercase">{v.status}</span>
        </div>
      ))}
    </div>
  );
};
