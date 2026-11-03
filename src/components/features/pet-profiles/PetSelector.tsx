import React from 'react';
import { Pet } from '@/types';

export const PetSelector: React.FC<{ pets: Pet[]; selectedId?: string; onSelect: (id: string) => void }> = ({ pets, selectedId, onSelect }) => {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {pets.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSelect(p.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors shrink-0 ${
            selectedId === p.id
              ? 'bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)] font-bold'
              : 'bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--surface-2)]'
          }`}
        >
          <span className="text-lg">🐾</span>
          <span>{p.name}</span>
        </button>
      ))}
    </div>
  );
};
