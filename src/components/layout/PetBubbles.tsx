import React from 'react';
import { PawBubbleLayer } from '../PawBubbleLayer';

export const PetBubbles: React.FC<{ darkMode?: boolean }> = ({ darkMode = false }) => {
  return <PawBubbleLayer darkMode={darkMode} />;
};
