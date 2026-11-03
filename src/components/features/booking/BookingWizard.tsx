import React from 'react';

export const BookingWizard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <div className="space-y-6">{children}</div>;
};
