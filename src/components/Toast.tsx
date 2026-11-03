import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  text: string;
  type?: 'success' | 'info';
  actionLabel?: string;
  onAction?: () => void;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-60 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          data-testid="toast-notification"
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-2xl shadow-xl border animate-slide-up"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--on-primary)',
            borderColor: 'var(--coral)',
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: 'var(--coral)' }} />
            <p className="text-sm font-medium leading-snug break-words">{toast.text}</p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {toast.actionLabel && toast.onAction && (
              <button
                type="button"
                data-testid="toast-undo-btn"
                onClick={() => {
                  toast.onAction?.();
                  onDismiss(toast.id);
                }}
                className="px-3 py-1.5 rounded-full text-xs font-extrabold transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
                style={{
                  backgroundColor: 'var(--coral)',
                  color: '#FFFFFF',
                }}
              >
                {toast.actionLabel}
              </button>
            )}
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
