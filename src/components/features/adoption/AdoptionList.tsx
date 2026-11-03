import React from 'react';
import { AdoptionPet } from '@/types';
import { PetCard } from './PetCard';

export const AdoptionList: React.FC<{ pets: AdoptionPet[]; onSelect?: (slug: string) => void }> = ({ pets, onSelect }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {pets.map((p) => (
        <PetCard key={p.id} pet={p} onClick={() => onSelect?.(p.slug)} />
      ))}
    </div>
  );
};
