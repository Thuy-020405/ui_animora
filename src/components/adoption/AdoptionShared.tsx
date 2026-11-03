import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { AdoptionPet, AdoptionRequest, Language } from '../../types';
import {
  ADOPTION_SPECIES_TABS,
  ADOPTION_PROCESS_STEPS,
  AdoptionSpeciesTab,
  AdoptionSortOption,
  getSpeciesDisplayName,
  getGenderChipLabel,
  isPetAdopted,
  validateAdoptionForm,
  AdoptionFormValues,
  AdoptionFormFieldErrors,
} from '../../data/adoptionData';

export const SmallPawDecoration: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="18" cy="22.5" rx="6.5" ry="5.2" fill="currentColor" opacity="0.88" />
    <circle cx="10.2" cy="14.5" r="2.7" fill="currentColor" opacity="0.88" />
    <circle cx="15.2" cy="11.2" r="2.9" fill="currentColor" opacity="0.88" />
    <circle cx="20.8" cy="11.2" r="2.9" fill="currentColor" opacity="0.88" />
    <circle cx="25.8" cy="14.5" r="2.7" fill="currentColor" opacity="0.88" />
  </svg>
);

interface AdoptionHeaderProps {
  lang: Language;
  HeadingTag?: 'h1' | 'h2';
}

export const AdoptionSectionHeader: React.FC<AdoptionHeaderProps> = ({
  lang,
  HeadingTag = 'h2',
}) => {
  return (
    <div className="mb-8 space-y-5">
      <div className="space-y-2.5 max-w-2xl">
        <span
          data-testid="adopt-eyebrow-pill"
          className="block uppercase font-bold"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--primary)',
          }}
        >
          {lang === 'vi' ? 'NHẬN NUÔI THÚ CƯNG' : 'PET ADOPTION'}
        </span>

        <HeadingTag
          className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: 'var(--primary)',
          }}
        >
          {lang === 'vi' ? 'Tìm người bạn mới' : 'Find a new friend'}
        </HeadingTag>

        <p
          data-testid="adopt-subtitle"
          className="text-[18px] leading-relaxed font-normal"
          style={{ color: 'var(--text-muted)' }}
        >
          {lang === 'vi'
            ? 'Mỗi bé đang chờ một gia đình yêu thương.'
            : 'Every pet is waiting for a loving family.'}
        </p>
      </div>

      {/* 4-step process row, small and calm, horizontal scroller on mobile */}
      <div
        data-testid="adopt-process-row"
        className="flex items-center justify-start gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1"
      >
        {ADOPTION_PROCESS_STEPS.map((step, idx) => (
          <React.Fragment key={step.step}>
            <div className="inline-flex items-center gap-2 shrink-0">
              <span
                className="w-7 h-7 rounded-full inline-flex items-center justify-center text-[13px] font-extrabold shrink-0"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  color: 'var(--primary)',
                }}
              >
                {step.step}
              </span>
              <span
                className="text-[14px] font-semibold whitespace-nowrap"
                style={{ color: 'var(--text)' }}
              >
                {lang === 'vi' ? step.shortVi : step.shortEn}
              </span>
            </div>
            {idx < ADOPTION_PROCESS_STEPS.length - 1 && (
              <span
                aria-hidden="true"
                className="text-xs font-bold shrink-0 select-none px-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

interface AdoptionFilterToolbarProps {
  lang: Language;
  activeTab: AdoptionSpeciesTab;
  onSelectTab: (tab: AdoptionSpeciesTab) => void;
  counts: Record<AdoptionSpeciesTab, number>;
  sortBy: AdoptionSortOption;
  onChangeSort: (sort: AdoptionSortOption) => void;
}

export const AdoptionFilterToolbar: React.FC<AdoptionFilterToolbarProps> = ({
  lang,
  activeTab,
  onSelectTab,
  counts,
  sortBy,
  onChangeSort,
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = ADOPTION_SPECIES_TABS.length;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % total;
      const nextTab = ADOPTION_SPECIES_TABS[nextIndex];
      onSelectTab(nextTab.id);
      tabRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + total) % total;
      const prevTab = ADOPTION_SPECIES_TABS[prevIndex];
      onSelectTab(prevTab.id);
      tabRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      onSelectTab(ADOPTION_SPECIES_TABS[0].id);
      tabRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = total - 1;
      onSelectTab(ADOPTION_SPECIES_TABS[last].id);
      tabRefs.current[last]?.focus();
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
      {/* Species Tabs: role="tablist", single row, no wrap, height 44px, arrow-key navigation */}
      <div
        role="tablist"
        aria-label={lang === 'vi' ? 'Lọc thú cưng theo loài' : 'Filter pets by species'}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 max-w-full"
        style={{ scrollbarWidth: 'none' }}
      >
        {ADOPTION_SPECIES_TABS.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          const count = counts[tab.id] ?? 0;
          const label = lang === 'vi' ? tab.labelVi : tab.labelEn;

          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              data-testid={`adopt-tab-${tab.id}`}
              onClick={(e) => {
                onSelectTab(tab.id);
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="h-[44px] px-4 rounded-full text-[15px] font-bold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
              style={{
                backgroundColor: isActive ? 'var(--primary)' : 'var(--surface)',
                color: isActive ? 'var(--on-primary)' : 'var(--text)',
                borderColor: isActive ? 'var(--primary)' : 'var(--border)',
              }}
            >
              <span>{label}</span>
              <span
                className="text-[13px] font-bold px-1.5 py-0.5 rounded-full leading-none tabular-nums"
                style={{
                  backgroundColor: isActive
                    ? 'rgba(255, 244, 232, 0.2)'
                    : 'var(--surface-2)',
                  color: isActive ? 'var(--on-primary)' : 'var(--text-muted)',
                }}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Sort Dropdown on the right */}
      <div className="flex items-center justify-end gap-2 shrink-0">
        <label
          htmlFor="adoption-sort-select"
          className="text-[14px] font-bold whitespace-nowrap"
          style={{ color: 'var(--text-muted)' }}
        >
          {lang === 'vi' ? 'Sắp xếp:' : 'Sort:'}
        </label>
        <div className="relative">
          <select
            id="adoption-sort-select"
            data-testid="adopt-sort-select"
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value as AdoptionSortOption)}
            className="h-[44px] pl-4 pr-9 rounded-full text-[14px] font-bold border appearance-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
            }}
          >
            <option value="newest">{lang === 'vi' ? 'Mới nhất' : 'Newest'}</option>
            <option value="youngest">{lang === 'vi' ? 'Nhỏ tuổi nhất' : 'Youngest'}</option>
            <option value="nearest">{lang === 'vi' ? 'Gần tôi nhất' : 'Nearest to me'}</option>
          </select>
          <ChevronDown
            className="w-4 h-4 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
        </div>
      </div>
    </div>
  );
};

export interface AdoptionPetCardProps {
  pet: AdoptionPet;
  lang: Language;
  isLiked: boolean;
  onToggleLike: (petId: string) => void;
  onOpenProfile: (pet: AdoptionPet) => void;
  onOpenAdoptForm: (pet: AdoptionPet) => void;
  matchScore?: number;
  matchReason?: string;
}

export const AdoptionPetCard: React.FC<AdoptionPetCardProps> = ({
  pet,
  lang,
  isLiked,
  onToggleLike,
  onOpenProfile,
  onOpenAdoptForm,
  matchScore,
  matchReason,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const adopted = isPetAdopted(pet);

  const speciesLabel = getSpeciesDisplayName(pet.species, lang);
  const breedLabel = lang === 'vi' ? pet.breed : pet.breedEn || pet.breed;
  const ageLabel = lang === 'vi' ? pet.age : pet.ageEn || pet.age;
  const genderLabel = getGenderChipLabel(pet.gender, lang);
  const areaLabel = lang === 'vi' ? pet.area : pet.areaEn || pet.area;
  const personalityText =
    lang === 'vi' ? pet.personality : pet.personalityEn || pet.personality;

  const vaccinatedLabel = pet.vaccinated
    ? lang === 'vi'
      ? 'Đã tiêm phòng'
      : 'Vaccinated'
    : lang === 'vi'
    ? 'Chưa tiêm phòng'
    : 'Not vaccinated';

  const neuteredLabel = pet.neutered
    ? lang === 'vi'
      ? 'Đã triệt sản'
      : 'Neutered'
    : lang === 'vi'
    ? 'Chưa triệt sản'
    : 'Not neutered';

  const statusText = adopted
    ? lang === 'vi'
      ? 'Đã có gia đình'
      : 'Adopted'
    : lang === 'vi'
    ? 'Đang chờ gia đình'
    : 'Waiting for a family';

  const profileHref = `/nhan-nuoi/${pet.slug}`;

  const handleNavigateProfile = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenProfile(pet);
  };

  return (
    <article
      data-testid={`adopt-card-${pet.slug}`}
      className={`group relative h-full flex flex-col rounded-[24px] border p-6 transition-all duration-200 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#FF7F6B] ${
        adopted ? 'opacity-70' : ''
      }`}
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      {/* Top-right Wishlist Heart Button (36px round, aria-pressed) */}
      <button
        type="button"
        aria-pressed={isLiked}
        aria-label={
          lang === 'vi'
            ? `${isLiked ? 'Bỏ yêu thích' : 'Yêu thích'} ${pet.name}`
            : `${isLiked ? 'Remove from wishlist' : 'Save to wishlist'} ${pet.name}`
        }
        data-testid={`adopt-wishlist-${pet.slug}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike(pet.id);
        }}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full border flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
        style={{
          backgroundColor: isLiked ? '#FFF0EE' : 'var(--surface)',
          borderColor: isLiked ? '#FF7F6B' : 'var(--border)',
          color: isLiked ? '#FF7F6B' : 'var(--text-muted)',
        }}
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-[#FF7F6B] text-[#FF7F6B]' : ''}`} />
      </button>

      {/* Circular Photo Section (160px on mobile, 200px on desktop) */}
      <div className="relative mx-auto mb-5 flex flex-col items-center">
        <a
          href={profileHref}
          onClick={handleNavigateProfile}
          aria-label={
            lang === 'vi' ? `Xem hồ sơ của ${pet.name}` : `View profile of ${pet.name}`
          }
          className="relative block w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF7F6B]"
        >
          {/* Rotated slightly pink #F4B6C2 offset ring behind photo */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1.5 rounded-full border-[3px] border-[#F4B6C2] translate-x-1.5 translate-y-1 rotate-6 transition-transform duration-300 group-hover:rotate-12"
          />

          {/* Circle image container with 4px var(--surface) ring */}
          <div
            className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: 'var(--surface-2)',
              boxShadow: '0 0 0 4px var(--surface)',
            }}
          >
            {/* Paw icon placeholder on --surface-2 while loading or on error */}
            {(!imgLoaded || imgError) && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ backgroundColor: 'var(--surface-2)', color: 'var(--primary)' }}
              >
                <SmallPawDecoration className="w-12 h-12 opacity-45" />
              </div>
            )}

            {!imgError && (
              <img
                src={pet.photo}
                alt={pet.name}
                referrerPolicy="no-referrer"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04] ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ objectPosition: 'center 30%' }}
              />
            )}
          </div>
        </a>

        {/* Status ribbon on the bottom of photo */}
        <span
          data-testid={`adopt-status-${pet.slug}`}
          className="relative z-10 -mt-3.5 px-3.5 py-1 rounded-full text-[12px] font-extrabold tracking-wide shadow-xs whitespace-nowrap"
          style={{
            backgroundColor: adopted ? '#6B7280' : '#FF7F6B',
            color: '#FFFFFF',
          }}
        >
          {statusText}
        </span>

        {/* Compatibility Match Score Pill if calculated */}
        {matchScore !== undefined && matchScore > 0 && !adopted && (
          <span
            data-testid={`adopt-match-${pet.slug}`}
            className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold shadow-xs"
            style={{
              backgroundColor: matchScore >= 85 ? '#FF7F6B' : 'var(--primary)',
              color: '#FFFFFF',
            }}
            title={matchReason}
          >
            <Sparkles className="w-3 h-3" />
            <span>
              {matchScore}% {lang === 'vi' ? 'Phù hợp' : 'Match'}
            </span>
          </span>
        )}
      </div>

      {/* Text & Metadata Content */}
      <div className="flex flex-col items-center text-center flex-1">
        {/* Name: Baloo 2, 24px, weight 700, --primary, max 2 lines */}
        <h3 className="font-heading text-[24px] font-bold leading-snug line-clamp-2">
          <a
            href={profileHref}
            onClick={handleNavigateProfile}
            className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B] rounded"
            style={{ color: 'var(--primary)' }}
          >
            {pet.name}
          </a>
        </h3>

        {/* Info line: species · breed · age, Nunito 15px, --text-muted, max 2 lines */}
        <p
          className="font-sans text-[15px] font-medium mt-1 line-clamp-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {speciesLabel} · {breedLabel} · {ageLabel}
        </p>

        {/* Fact chips row (max 3 chips: gender, vaccinated, neutered) + Area with pin icon */}
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5">
          {/* Chip 1: Gender */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[13px] font-bold leading-none"
            style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0 opacity-75" />
            <span>{genderLabel}</span>
          </span>

          {/* Chip 2: Vaccinated */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[13px] font-bold leading-none"
            style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0 opacity-75" />
            <span>{vaccinatedLabel}</span>
          </span>

          {/* Chip 3: Neutered */}
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[13px] font-bold leading-none"
            style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
          >
            <Check className="w-3.5 h-3.5 shrink-0 opacity-75" />
            <span>{neuteredLabel}</span>
          </span>
        </div>

        {/* Area with Pin Icon */}
        <div
          className="mt-2 inline-flex items-center justify-center gap-1 text-[13px] font-bold"
          style={{ color: 'var(--text-muted)' }}
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#FF7F6B' }} />
          <span>
            {lang === 'vi' ? 'Khu vực:' : 'Area:'} {areaLabel}
          </span>
        </div>

        {/* Personality line: 16px, weight 500, color --text, max 2 lines */}
        <p
          className="font-sans text-[16px] font-medium mt-3 line-clamp-2 leading-snug"
          style={{ color: 'var(--text)' }}
        >
          {personalityText}
        </p>
      </div>

      {/* Actions at bottom of card (grid, margin-top: auto) */}
      <div className="grid gap-3 pt-5 mt-auto">
        {/* Primary button: full width, height 44px, --primary fill with --on-primary text, hover coral #FF7F6B */}
        <button
          type="button"
          disabled={adopted}
          data-testid={`adopt-primary-btn-${pet.slug}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!adopted) {
              onOpenAdoptForm(pet);
            }
          }}
          className={`w-full h-[44px] px-4 rounded-full text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B] ${
            adopted
              ? 'cursor-not-allowed opacity-60 bg-gray-400 text-white'
              : 'cursor-pointer bg-[var(--primary)] text-[var(--on-primary)] hover:!bg-[#FF7F6B] hover:!text-white'
          }`}
        >
          <span>
            {adopted
              ? lang === 'vi'
                ? `${pet.name} đã có gia đình`
                : `${pet.name} is adopted`
              : lang === 'vi'
              ? `Nhận nuôi ${pet.name}`
              : `Adopt ${pet.name}`}
          </span>
        </button>

        {/* Secondary row below: text link "Xem hồ sơ" */}
        <div className="flex items-center justify-center pt-0.5">
          <a
            href={profileHref}
            data-testid={`adopt-view-profile-${pet.slug}`}
            onClick={handleNavigateProfile}
            className="inline-flex items-center gap-1.5 text-[14px] font-bold hover:underline py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B] rounded"
            style={{ color: 'var(--primary)' }}
          >
            <span>{lang === 'vi' ? 'Xem hồ sơ' : 'View profile'}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};

export const AdoptionSkeletonGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div
      data-testid="adopt-skeleton-grid"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1920px]:grid-cols-4 gap-6"
    >
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-[24px] border p-6 flex flex-col items-center animate-pulse"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
          }}
        >
          <div
            className="w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full mb-5"
            style={{ backgroundColor: 'var(--surface-2)' }}
          />
          <div
            className="h-6 w-32 rounded-full mb-2.5"
            style={{ backgroundColor: 'var(--surface-2)' }}
          />
          <div
            className="h-4 w-44 rounded-full mb-4"
            style={{ backgroundColor: 'var(--surface-2)' }}
          />
          <div className="flex gap-2 mb-4">
            <div
              className="h-6 w-20 rounded-full"
              style={{ backgroundColor: 'var(--surface-2)' }}
            />
            <div
              className="h-6 w-24 rounded-full"
              style={{ backgroundColor: 'var(--surface-2)' }}
            />
          </div>
          <div
            className="h-4 w-full rounded-full mb-2"
            style={{ backgroundColor: 'var(--surface-2)' }}
          />
          <div
            className="h-4 w-3/4 rounded-full mb-6"
            style={{ backgroundColor: 'var(--surface-2)' }}
          />
          <div
            className="h-[44px] w-full rounded-full mt-auto"
            style={{ backgroundColor: 'var(--surface-2)' }}
          />
        </div>
      ))}
    </div>
  );
};

export const AdoptionEmptyState: React.FC<{
  lang: Language;
  onResetFilter: () => void;
}> = ({ lang, onResetFilter }) => {
  return (
    <div
      data-testid="adopt-empty-state"
      className="rounded-[24px] border p-10 text-center max-w-lg mx-auto my-6"
      style={{
        backgroundColor: 'var(--surface)',
        borderColor: 'var(--border)',
        boxShadow: 'var(--shadow)',
      }}
    >
      <div
        className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ backgroundColor: 'var(--surface-2)', color: 'var(--primary)' }}
      >
        <SmallPawDecoration className="w-8 h-8" />
      </div>
      <h3
        className="font-heading text-2xl font-bold mb-2"
        style={{ color: 'var(--primary)' }}
      >
        {lang === 'vi'
          ? 'Hiện chưa có bé nào trong mục này'
          : 'No pets in this category yet'}
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        {lang === 'vi'
          ? 'Hãy khám phá tất cả các bé khác đang chờ một gia đình yêu thương tại Animora nhé.'
          : 'Explore all other companions waiting for a loving family at Animora.'}
      </p>
      <button
        type="button"
        onClick={onResetFilter}
        className="h-[44px] px-6 rounded-full text-sm font-bold cursor-pointer transition-colors"
        style={{
          backgroundColor: 'var(--primary)',
          color: 'var(--on-primary)',
        }}
      >
        {lang === 'vi' ? 'Xem tất cả các bé' : 'See all pets'}
      </button>
    </div>
  );
};

interface AdoptionRequestModalProps {
  pet: AdoptionPet | null;
  lang: Language;
  onClose: () => void;
  onSubmitRequest: (req: AdoptionRequest) => void;
}

export const AdoptionRequestModal: React.FC<AdoptionRequestModalProps> = ({
  pet,
  lang,
  onClose,
  onSubmitRequest,
}) => {
  const [values, setValues] = useState<AdoptionFormValues>({
    applicantName: '',
    phone: '',
    email: '',
    area: pet ? (lang === 'vi' ? pet.area || 'TP.HCM' : pet.areaEn || pet.area || 'Ho Chi Minh City') : 'TP.HCM',
    hadPetBefore: '',
    livingCondition: '',
    notes: '',
    agreedCommitment: false,
  });
  const [errors, setErrors] = useState<AdoptionFormFieldErrors>({});

  useEffect(() => {
    if (pet) {
      setValues({
        applicantName: '',
        phone: '',
        email: '',
        area: lang === 'vi' ? pet.area || 'TP.HCM' : pet.areaEn || pet.area || 'Ho Chi Minh City',
        hadPetBefore: '',
        livingCondition: '',
        notes: '',
        agreedCommitment: false,
      });
      setErrors({});
    }
  }, [pet, lang]);

  if (!pet) return null;

  const handleFieldChange = <K extends keyof AdoptionFormValues>(
    field: K,
    val: AdoptionFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAdoptionForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const newReq: AdoptionRequest = {
      id: 'req-' + Date.now(),
      petId: pet.id,
      petSlug: pet.slug,
      petName: pet.name,
      applicantName: values.applicantName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      area: values.area.trim() || pet.area,
      hadPetBefore: values.hadPetBefore === 'yes',
      livingCondition: values.livingCondition as 'house' | 'apartment' | 'other',
      notes: values.notes.trim(),
      agreedCommitment: values.agreedCommitment,
      createdAt: new Date().toISOString(),
    };

    onSubmitRequest(newReq);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="adoption-form-modal-title"
      data-testid="adoption-request-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-[24px] border p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={lang === 'vi' ? 'Đóng biểu mẫu' : 'Close form'}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center border transition-colors hover:bg-[var(--surface-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Pet Header with pre-filled pet name */}
        <div
          className="flex items-center gap-4 pb-5 mb-5 border-b"
          style={{ borderColor: 'var(--border)' }}
        >
          <img
            src={pet.photo}
            alt={pet.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 shrink-0"
            style={{ borderColor: '#F4B6C2', objectPosition: 'center 30%' }}
          />
          <div>
            <span
              className="text-[12px] font-bold uppercase tracking-[0.12em] block"
              style={{ color: '#FF7F6B' }}
            >
              {lang === 'vi' ? 'ĐƠN ĐĂNG KÝ NHẬN NUÔI' : 'ADOPTION APPLICATION'}
            </span>
            <h2
              id="adoption-form-modal-title"
              className="font-heading text-2xl sm:text-3xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi' ? `Nhận nuôi ${pet.name}` : `Adopt ${pet.name}`}
            </h2>
            <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              {getSpeciesDisplayName(pet.species, lang)} ·{' '}
              {lang === 'vi' ? pet.breed : pet.breedEn || pet.breed} ·{' '}
              {lang === 'vi' ? pet.age : pet.ageEn || pet.age}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Pet Name (Pre-filled read-only field for clarity) */}
          <div>
            <label
              htmlFor="adopt-pet-name-input"
              className="block text-xs font-bold mb-1"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'vi' ? 'Bé đăng ký nhận nuôi' : 'Selected pet'}
            </label>
            <input
              id="adopt-pet-name-input"
              type="text"
              readOnly
              value={`${pet.name} (${lang === 'vi' ? pet.breed : pet.breedEn || pet.breed})`}
              className="w-full h-11 px-4 rounded-xl border text-sm font-bold opacity-85 cursor-default"
              style={{
                backgroundColor: 'var(--surface-2)',
                borderColor: 'var(--border)',
                color: 'var(--primary)',
              }}
            />
          </div>

          {/* Row 1: Họ tên* & Số điện thoại* */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="adopt-name-input"
                className="block text-xs font-bold mb-1"
                style={{ color: 'var(--text)' }}
              >
                {lang === 'vi' ? 'Họ tên *' : 'Full name *'}
              </label>
              <input
                id="adopt-name-input"
                data-testid="adopt-input-name"
                type="text"
                value={values.applicantName}
                onChange={(e) => handleFieldChange('applicantName', e.target.value)}
                placeholder={lang === 'vi' ? 'Nguyễn Văn A' : 'Alex Nguyen'}
                className="form-input w-full"
                aria-invalid={Boolean(errors.applicantName)}
              />
              {errors.applicantName && (
                <p
                  data-testid="adopt-error-name"
                  className="text-xs font-semibold mt-1 text-[#DC2626]"
                >
                  {lang === 'vi' ? errors.applicantName.vi : errors.applicantName.en}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="adopt-phone-input"
                className="block text-xs font-bold mb-1"
                style={{ color: 'var(--text)' }}
              >
                {lang === 'vi' ? 'Số điện thoại *' : 'Phone number *'}
              </label>
              <input
                id="adopt-phone-input"
                data-testid="adopt-input-phone"
                type="tel"
                value={values.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="0901234567"
                className="form-input w-full"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && (
                <p
                  data-testid="adopt-error-phone"
                  className="text-xs font-semibold mt-1 text-[#DC2626]"
                >
                  {lang === 'vi' ? errors.phone.vi : errors.phone.en}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Email* & Khu vực */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="adopt-email-input"
                className="block text-xs font-bold mb-1"
                style={{ color: 'var(--text)' }}
              >
                {lang === 'vi' ? 'Email *' : 'Email *'}
              </label>
              <input
                id="adopt-email-input"
                data-testid="adopt-input-email"
                type="email"
                value={values.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="ban@email.com"
                className="form-input w-full"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && (
                <p
                  data-testid="adopt-error-email"
                  className="text-xs font-semibold mt-1 text-[#DC2626]"
                >
                  {lang === 'vi' ? errors.email.vi : errors.email.en}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="adopt-area-input"
                className="block text-xs font-bold mb-1"
                style={{ color: 'var(--text)' }}
              >
                {lang === 'vi' ? 'Khu vực sinh sống' : 'Your area / city'}
              </label>
              <input
                id="adopt-area-input"
                data-testid="adopt-input-area"
                type="text"
                value={values.area}
                onChange={(e) => handleFieldChange('area', e.target.value)}
                placeholder={lang === 'vi' ? 'Đà Nẵng / TP.HCM / Hà Nội' : 'Da Nang / HCMC / Hanoi'}
                className="form-input w-full"
              />
            </div>
          </div>

          {/* Row 3: "Bạn đã từng nuôi thú cưng chưa?" (Yes/No) */}
          <div>
            <span className="block text-xs font-bold mb-1.5" style={{ color: 'var(--text)' }}>
              {lang === 'vi'
                ? 'Bạn đã từng nuôi thú cưng chưa? *'
                : 'Have you owned a pet before? *'}
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'yes', labelVi: 'Đã từng nuôi', labelEn: 'Yes, I have' },
                { id: 'no', labelVi: 'Chưa từng (Lần đầu)', labelEn: 'No (First time)' },
              ].map((opt) => {
                const selected = values.hadPetBefore === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    data-testid={`adopt-exp-${opt.id}`}
                    onClick={() =>
                      handleFieldChange('hadPetBefore', opt.id as 'yes' | 'no')
                    }
                    className="h-11 px-4 rounded-xl border text-xs font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: selected ? 'var(--primary)' : 'var(--bg)',
                      color: selected ? 'var(--on-primary)' : 'var(--text)',
                      borderColor: selected ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {lang === 'vi' ? opt.labelVi : opt.labelEn}
                  </button>
                );
              })}
            </div>
            {errors.hadPetBefore && (
              <p
                data-testid="adopt-error-exp"
                className="text-xs font-semibold mt-1 text-[#DC2626]"
              >
                {lang === 'vi' ? errors.hadPetBefore.vi : errors.hadPetBefore.en}
              </p>
            )}
          </div>

          {/* Row 4: "Điều kiện sống" (Nhà riêng / Chung cư / Khác) */}
          <div>
            <span className="block text-xs font-bold mb-1.5" style={{ color: 'var(--text)' }}>
              {lang === 'vi' ? 'Điều kiện sống *' : 'Living condition *'}
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'house', labelVi: 'Nhà riêng', labelEn: 'House' },
                { id: 'apartment', labelVi: 'Chung cư', labelEn: 'Apartment' },
                { id: 'other', labelVi: 'Khác', labelEn: 'Other' },
              ].map((opt) => {
                const selected = values.livingCondition === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    data-testid={`adopt-living-${opt.id}`}
                    onClick={() =>
                      handleFieldChange(
                        'livingCondition',
                        opt.id as 'house' | 'apartment' | 'other'
                      )
                    }
                    className="h-11 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: selected ? 'var(--primary)' : 'var(--bg)',
                      color: selected ? 'var(--on-primary)' : 'var(--text)',
                      borderColor: selected ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {lang === 'vi' ? opt.labelVi : opt.labelEn}
                  </button>
                );
              })}
            </div>
            {errors.livingCondition && (
              <p
                data-testid="adopt-error-living"
                className="text-xs font-semibold mt-1 text-[#DC2626]"
              >
                {lang === 'vi' ? errors.livingCondition.vi : errors.livingCondition.en}
              </p>
            )}
          </div>

          {/* Row 5: Lời nhắn (optional) */}
          <div>
            <label
              htmlFor="adopt-notes-input"
              className="block text-xs font-bold mb-1"
              style={{ color: 'var(--text)' }}
            >
              {lang === 'vi' ? 'Lời nhắn (không bắt buộc)' : 'Message (optional)'}
            </label>
            <textarea
              id="adopt-notes-input"
              data-testid="adopt-input-notes"
              rows={3}
              value={values.notes}
              onChange={(e) => handleFieldChange('notes', e.target.value)}
              placeholder={
                lang === 'vi'
                  ? 'Chia sẻ thêm về thời gian rảnh hoặc mong muốn của gia đình bạn...'
                  : 'Share a bit about your daily schedule or household...'
              }
              className="form-input w-full h-auto py-2.5"
            />
          </div>

          {/* Row 6: Consent checkbox "Tôi cam kết chăm sóc bé tận tâm" */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                data-testid="adopt-checkbox-consent"
                checked={values.agreedCommitment}
                onChange={(e) => handleFieldChange('agreedCommitment', e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#6B1F2E] rounded cursor-pointer"
              />
              <span className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--text)' }}>
                {lang === 'vi'
                  ? 'Tôi cam kết chăm sóc bé tận tâm'
                  : 'I commit to caring for this pet wholeheartedly'}
              </span>
            </label>
            {errors.agreedCommitment && (
              <p
                data-testid="adopt-error-consent"
                className="text-xs font-semibold mt-1 text-[#DC2626]"
              >
                {lang === 'vi' ? errors.agreedCommitment.vi : errors.agreedCommitment.en}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              data-testid="adopt-submit-btn"
              className="w-full h-[46px] rounded-full text-sm font-bold cursor-pointer transition-colors bg-[var(--primary)] text-[var(--on-primary)] hover:!bg-[#FF7F6B] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
            >
              {lang === 'vi' ? 'Gửi đăng ký nhận nuôi' : 'Submit adoption request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
