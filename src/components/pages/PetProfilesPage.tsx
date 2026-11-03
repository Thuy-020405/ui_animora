import React from 'react';
import {
  Language,
  PageId,
  Pet,
  Vaccination,
  Booking,
} from '../../types';
import { PetProfiles } from '../PetProfiles';

interface PetProfilesPageProps {
  lang: Language;
  pets: Pet[];
  vaccinations: Vaccination[];
  onUpdatePet: (updatedPet: Pet, updatedVaccinations: Vaccination[]) => void;
  onAddPet: (newPet: Pet, newVaccinations: Vaccination[]) => void;
  onNavigate: (page: PageId) => void;
  onBookService?: (serviceName: string) => void;
  onAddBooking?: (booking: Booking) => void;
  onShowToast?: (text: string) => void;
}

export const PetProfilesPage: React.FC<PetProfilesPageProps> = ({
  lang,
  pets,
  vaccinations,
  onUpdatePet,
  onAddPet,
  onBookService,
  onAddBooking,
  onShowToast,
}) => {
  return (
    <div data-testid="page-pet-profiles" className="pb-12">
      {/* Main Refined Pet Profiles Section */}
      <PetProfiles
        lang={lang}
        pets={pets}
        vaccinations={vaccinations}
        onUpdatePet={onUpdatePet}
        onAddPet={onAddPet}
        onBookService={onBookService}
        onAddBooking={onAddBooking}
        onShowToast={onShowToast}
      />
    </div>
  );
};

