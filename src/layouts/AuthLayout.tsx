import React from 'react';
import { Outlet } from 'react-router';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] text-[var(--text)]">
      <div className="w-full max-w-4xl p-4">
        <Outlet />
      </div>
    </div>
  );
};
