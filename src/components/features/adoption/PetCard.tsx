import React from 'react';
import { AdoptionPet } from '@/types';

export const PetCard: React.FC<{ pet: AdoptionPet; onClick?: () => void }> = ({ pet, onClick }) => {
  return (
    <div onClick={onClick} className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
      <img src={pet.photo} alt={pet.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg font-heading text-[var(--primary)]">{pet.name}</h3>
        <p className="text-xs text-[var(--text-muted)]">{pet.species} • {pet.breed} • {pet.age}</p>
      </div>
    </div>
  );
};
