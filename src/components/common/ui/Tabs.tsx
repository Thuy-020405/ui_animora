import React from 'react';

export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeKey, onChange }) => {
  return (
    <div className="flex border-b border-[var(--border)] gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
            activeKey === tab.key
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
