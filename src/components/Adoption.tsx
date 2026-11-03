import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { AdoptionPet, AdoptionRequest, Language } from '../types';
import {
  AdoptionSpeciesTab,
  AdoptionSortOption,
  getAdoptionSpeciesCounts,
  filterAndSortAdoptionPets,
} from '../data/adoptionData';
import {
  AdoptionSectionHeader,
  AdoptionFilterToolbar,
  AdoptionPetCard,
  AdoptionSkeletonGrid,
  AdoptionEmptyState,
} from './adoption/AdoptionShared';

interface AdoptionProps {
  lang: Language;
  adoptionPets: AdoptionPet[];
  onAddAdoptionRequest: (req: AdoptionRequest) => void;
  onOpenDetail?: () => void;
  onOpenPetProfile?: (slug: string) => void;
  likedPetIds?: string[];
  onToggleLikePet?: (petId: string) => void;
}

export const Adoption: React.FC<AdoptionProps> = ({
  lang,
  adoptionPets,
  onAddAdoptionRequest,
  onOpenDetail,
  onOpenPetProfile,
  likedPetIds = [],
  onToggleLikePet,
}) => {
  const [activeTab, setActiveTab] = useState<AdoptionSpeciesTab>('All');
  const [sortBy, setSortBy] = useState<AdoptionSortOption>('newest');
  const [isLoading, setIsLoading] = useState(false);
  const [localLikes, setLocalLikes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('animora_adoption_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const effectiveLikes = onToggleLikePet ? likedPetIds : localLikes;

  const handleToggleLike = (petId: string) => {
    if (onToggleLikePet) {
      onToggleLikePet(petId);
      return;
    }
    setLocalLikes((prev) => {
      const next = prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId];
      try {
        localStorage.setItem('animora_adoption_wishlist', JSON.stringify(next));
      } catch {
        // ignore storage error
      }
      return next;
    });
  };

  const counts = getAdoptionSpeciesCounts(adoptionPets);
  const filteredAndSorted = filterAndSortAdoptionPets(adoptionPets, activeTab, sortBy);
  const visiblePets = filteredAndSorted.slice(0, 6);

  const handleSelectTab = (tab: AdoptionSpeciesTab) => {
    setActiveTab(tab);
  };

  const handleChangeSort = (nextSort: AdoptionSortOption) => {
    setSortBy(nextSort);
  };

  const handleOpenProfile = (pet: AdoptionPet) => {
    if (onOpenPetProfile) {
      onOpenPetProfile(pet.slug);
    } else if (onOpenDetail) {
      window.history.pushState({}, '', `/nhan-nuoi/${pet.slug}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      onOpenDetail();
    }
  };

  const handleSeeAllPets = () => {
    if (onOpenDetail) {
      window.history.pushState({}, '', '/nhan-nuoi');
      window.dispatchEvent(new PopStateEvent('popstate'));
      onOpenDetail();
    }
  };

  return (
    <section
      id="adopt"
      data-testid="home-adopt-section"
      className="py-16 lg:py-24 relative"
    >
      {/* Shared content container: max-width 1200px, padding-inline 24px (expands at 1920px for 4 columns) */}
      <div className="max-w-[1200px] min-[1920px]:max-w-[1520px] mx-auto px-6">
        {/* 1. Section Header */}
        <AdoptionSectionHeader lang={lang} HeadingTag="h2" />

        {/* 2. Species Tabs + Sort Dropdown */}
        <AdoptionFilterToolbar
          lang={lang}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          counts={counts}
          sortBy={sortBy}
          onChangeSort={handleChangeSort}
        />

        {/* 3. Pet Cards Grid / Loading / Empty State */}
        {isLoading ? (
          <AdoptionSkeletonGrid count={6} />
        ) : visiblePets.length === 0 ? (
          <AdoptionEmptyState
            lang={lang}
            onResetFilter={() => setActiveTab('All')}
          />
        ) : (
          <div
            data-testid="adopt-cards-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1920px]:grid-cols-4 gap-6 items-stretch"
          >
            {visiblePets.map((pet) => (
              <AdoptionPetCard
                key={pet.id}
                pet={pet}
                lang={lang}
                isLiked={effectiveLikes.includes(pet.id)}
                onToggleLike={handleToggleLike}
                onOpenProfile={handleOpenProfile}
                onOpenAdoptForm={(selected) => {
                  const targetPath = `/nhan-nuoi/${selected.slug}/dang-ky`;
                  if (window.location.pathname !== targetPath) {
                    window.history.pushState({}, '', targetPath);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }
                  onOpenDetail?.();
                  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        )}

        {/* 6. "Xem tất cả các bé" (See all pets) button opening /nhan-nuoi */}
        <div className="text-center mt-10">
          <button
            type="button"
            data-testid="home-cta-adopt"
            onClick={handleSeeAllPets}
            className="h-[48px] px-7 rounded-full text-[15px] font-bold inline-flex items-center justify-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--primary)',
              borderColor: 'var(--primary)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <span>
              {lang === 'vi' ? 'Xem tất cả các bé' : 'See all pets'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
