import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--surface)] text-xs font-bold text-[var(--text)] hover:bg-[var(--surface-2)] transition-colors ${className}`}
    >
      {lang === 'vi' ? '🇻🇳 VI' : '🇬🇧 EN'}
    </button>
  );
};
