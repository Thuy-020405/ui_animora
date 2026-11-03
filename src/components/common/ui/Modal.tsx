import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-up">
      <div className="bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        {title && (
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--border)]">
            <h3 className="text-xl font-bold font-heading text-[var(--primary)]">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-lg"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};
