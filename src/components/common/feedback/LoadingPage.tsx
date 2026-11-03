import React from 'react';

export const LoadingPage: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[var(--coral)] border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold text-[var(--text-muted)]">Đang tải...</span>
      </div>
    </div>
  );
};
