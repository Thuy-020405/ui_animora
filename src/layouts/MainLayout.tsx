import React from 'react';
import { Outlet } from 'react-router';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
