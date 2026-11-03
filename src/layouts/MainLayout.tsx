import React from 'react';
import { Outlet } from 'react-router';
import { ColorBleedBackground } from '@/components/ColorBleedBackground';
import { PawBubbleLayer } from '@/components/PawBubbleLayer';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';

export const MainLayout: React.FC = () => {
  const { darkMode } = useTheme();
  const { lang } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] relative overflow-x-hidden">
      <ColorBleedBackground darkMode={darkMode} lang={lang} />
      <PawBubbleLayer darkMode={darkMode} />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};
