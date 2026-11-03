import React from 'react';

export const Filters: React.FC<{ categories: string[]; activeCategory: string; onSelect: (cat: string) => void }> = ({
  categories,
  activeCategory,
  onSelect,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
            activeCategory === cat
              ? 'bg-[var(--primary)] text-[var(--on-primary)]'
              : 'bg-[var(--surface-2)] text-[var(--text)] hover:bg-[var(--border)]'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};
