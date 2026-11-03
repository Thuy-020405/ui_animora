import React from 'react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--surface)] text-[var(--text)] border-l border-[var(--border)] p-6 shadow-xl flex flex-col justify-between">
          {title && (
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <h2 className="text-xl font-bold font-heading text-[var(--primary)]">{title}</h2>
              <button type="button" onClick={onClose} className="p-2 text-[var(--text-muted)] hover:text-[var(--text)]">✕</button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto py-4">{children}</div>
        </div>
      </div>
    </div>
  );
};
