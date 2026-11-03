import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Heart,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Check,
  Calendar,
  Cpu,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  RotateCcw,
  HelpCircle,
  Award,
  AlertCircle,
  Info,
  ThumbsUp,
  PawPrint,
  Smile,
  Home as HomeIcon,
  X,
  Share2,
} from 'lucide-react';
import { AdoptionPet, AdoptionRequest, Language, PageId } from '../../types';
import {
  AdoptionSpeciesTab,
  AdoptionSortOption,
  ADOPTION_SPECIES_TABS,
  ADOPTION_PROCESS_STEPS,
  ADOPTER_REQUIREMENTS,
  getAdoptionSpeciesCounts,
  filterAndSortAdoptionPets,
  getSpeciesDisplayName,
  getGenderChipLabel,
  isPetAdopted,
  parseAdoptionUrlPath,
} from '../../data/adoptionData';
import {
  AdoptionSectionHeader,
  AdoptionFilterToolbar,
  AdoptionPetCard,
  AdoptionSkeletonGrid,
  AdoptionEmptyState,
  SmallPawDecoration,
} from '../adoption/AdoptionShared';
import { AdoptionApplyPage } from '../adoption/AdoptionApplyPage';
import {
  calculateAdoptionMatchScore,
  AdoptionMatchPreferences,
  AdoptionMatchResult,
} from '../../utils/petLogic';
import { CONTACT_INFO } from '../../config/contact';

interface AdoptionPageProps {
  lang: Language;
  adoptionPets: AdoptionPet[];
  adoptionRequests: AdoptionRequest[];
  onAddAdoptionRequest: (req: AdoptionRequest) => void;
  onNavigate: (page: PageId) => void;
  initialPetSlug?: string | null;
}

export const AdoptionPage: React.FC<AdoptionPageProps> = ({
  lang,
  adoptionPets,
  adoptionRequests,
  onAddAdoptionRequest,
  onNavigate,
  initialPetSlug = null,
}) => {
  const initialUrlState = parseAdoptionUrlPath(
    typeof window !== 'undefined' ? window.location.pathname : '/nhan-nuoi'
  );

  const [currentSlug, setCurrentSlug] = useState<string | null>(() => {
    return initialUrlState.slug || initialPetSlug;
  });

  const [isApplyRoute, setIsApplyRoute] = useState<boolean>(() => {
    return initialUrlState.isApplyRoute;
  });

  const [isSuccessRoute, setIsSuccessRoute] = useState<boolean>(() => {
    return initialUrlState.isSuccessRoute;
  });

  const [activeTab, setActiveTab] = useState<AdoptionSpeciesTab>('All');
  const [sortBy, setSortBy] = useState<AdoptionSortOption>('newest');
  const [isLoading, setIsLoading] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const catalogSectionRef = useRef<HTMLDivElement | null>(null);
  const processSectionRef = useRef<HTMLDivElement | null>(null);

  // Search & Secondary filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState<'all' | 'baby' | 'young' | 'adult'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'Đực' | 'Cái'>('all');
  const [onlyVaccinated, setOnlyVaccinated] = useState(false);
  const [onlyNeutered, setOnlyNeutered] = useState(false);
  const [onlyLiked, setOnlyLiked] = useState(false);

  // Interactive Match-Maker Quiz state
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizPrefs, setQuizPrefs] = useState<AdoptionMatchPreferences>({
    preferredSpecies: 'All',
    livingSpace: 'apartment',
    dailyTime: 'moderate',
    experience: 'first_time',
  });
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [likedPetIds, setLikedPetIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('animora_adoption_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Calculate compatibility scores for all pets when quiz is submitted
  const matchScoresMap = useMemo(() => {
    if (!quizSubmitted) return new Map<string, AdoptionMatchResult>();
    const map = new Map<string, AdoptionMatchResult>();
    for (const pet of adoptionPets) {
      const res = calculateAdoptionMatchScore(pet, quizPrefs);
      map.set(pet.id, res);
    }
    return map;
  }, [quizSubmitted, quizPrefs, adoptionPets]);

  const counts = useMemo(() => {
    return getAdoptionSpeciesCounts(adoptionPets);
  }, [adoptionPets]);

  const filteredPets = useMemo(() => {
    let list = [...adoptionPets];

    // Species tab
    if (activeTab !== 'All') {
      list = list.filter((p) => p.species === activeTab);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => {
        const matchName = p.name.toLowerCase().includes(q);
        const matchBreed = (p.breed + ' ' + (p.breedEn || '')).toLowerCase().includes(q);
        const matchColor = (p.color + ' ' + (p.colorEn || '')).toLowerCase().includes(q);
        const matchPersonality = (p.personality + ' ' + (p.personalityEn || '')).toLowerCase().includes(q);
        const matchTags = (p.tags || []).some((t) => t.toLowerCase().includes(q));
        const matchArea = (p.area + ' ' + (p.areaEn || '')).toLowerCase().includes(q);
        return matchName || matchBreed || matchColor || matchPersonality || matchTags || matchArea;
      });
    }

    // Age filter
    if (ageFilter === 'baby') {
      list = list.filter(
        (p) =>
          (p.ageMonths ?? 24) <= 12 ||
          p.age.toLowerCase().includes('tháng') ||
          (p.ageEn && p.ageEn.toLowerCase().includes('month'))
      );
    } else if (ageFilter === 'young') {
      list = list.filter((p) => {
        const m = p.ageMonths ?? 24;
        return m > 12 && m <= 36;
      });
    } else if (ageFilter === 'adult') {
      list = list.filter((p) => (p.ageMonths ?? 24) > 36);
    }

    // Gender filter
    if (genderFilter !== 'all') {
      list = list.filter((p) => p.gender === genderFilter);
    }

    // Health filters
    if (onlyVaccinated) {
      list = list.filter((p) => p.vaccinated);
    }
    if (onlyNeutered) {
      list = list.filter((p) => p.neutered);
    }

    // Favorites filter
    if (onlyLiked) {
      list = list.filter((p) => likedPetIds.includes(p.id));
    }

    // Sorting
    list.sort((a, b) => {
      const adoptedA = isPetAdopted(a);
      const adoptedB = isPetAdopted(b);
      if (adoptedA && !adoptedB) return 1;
      if (!adoptedA && adoptedB) return -1;

      if (quizSubmitted) {
        const scoreA = matchScoresMap.get(a.id)?.score ?? 0;
        const scoreB = matchScoresMap.get(b.id)?.score ?? 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
      }

      if (sortBy === 'youngest') {
        const mA = a.ageMonths ?? 24;
        const mB = b.ageMonths ?? 24;
        return mA - mB;
      }
      if (sortBy === 'nearest') {
        const dA = a.distanceKm ?? 999;
        const dB = b.distanceKm ?? 999;
        return dA - dB;
      }
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

    return list;
  }, [
    adoptionPets,
    activeTab,
    searchQuery,
    ageFilter,
    genderFilter,
    onlyVaccinated,
    onlyNeutered,
    onlyLiked,
    likedPetIds,
    sortBy,
    quizSubmitted,
    matchScoresMap,
  ]);

  const handleResetFilters = () => {
    setActiveTab('All');
    setSearchQuery('');
    setAgeFilter('all');
    setGenderFilter('all');
    setOnlyVaccinated(false);
    setOnlyNeutered(false);
    setOnlyLiked(false);
    setSortBy('newest');
    setQuizSubmitted(false);
  };

  // Sync with browser popstate (/nhan-nuoi, /nhan-nuoi/{slug}, /nhan-nuoi/{slug}/dang-ky, /nhan-nuoi/{slug}/dang-ky/thanh-cong)
  useEffect(() => {
    const syncRoute = () => {
      const parsed = parseAdoptionUrlPath(window.location.pathname);
      setCurrentSlug(parsed.slug);
      setIsApplyRoute(parsed.isApplyRoute);
      setIsSuccessRoute(parsed.isSuccessRoute);
      setActivePhotoIndex(0);
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, [adoptionPets]);

  useEffect(() => {
    if (initialPetSlug) {
      setCurrentSlug(initialPetSlug);
      setActivePhotoIndex(0);
    }
  }, [initialPetSlug]);

  const handleToggleLike = (petId: string) => {
    setLikedPetIds((prev) => {
      const next = prev.includes(petId)
        ? prev.filter((id) => id !== petId)
        : [...prev, petId];
      try {
        localStorage.setItem('animora_adoption_wishlist', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleOpenApply = (petOrSlug: AdoptionPet | string) => {
    const targetSlug = typeof petOrSlug === 'string' ? petOrSlug : petOrSlug.slug;
    const targetPath = `/nhan-nuoi/${targetSlug}/dang-ky`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentSlug(targetSlug);
    setIsApplyRoute(true);
    setIsSuccessRoute(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleNavigateUrl = (targetUrl: string) => {
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({}, '', targetUrl);
    }
    const parsed = parseAdoptionUrlPath(targetUrl);
    setCurrentSlug(parsed.slug);
    setIsApplyRoute(parsed.isApplyRoute);
    setIsSuccessRoute(parsed.isSuccessRoute);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const navigateToSlug = (slug: string | null) => {
    const targetPath = slug ? `/nhan-nuoi/${slug}` : '/nhan-nuoi';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setCurrentSlug(slug);
    setIsApplyRoute(false);
    setIsSuccessRoute(false);
    setActivePhotoIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================================================
  // MULTI-STEP APPLY PAGE OR SUCCESS VIEW: /nhan-nuoi/{slug}/dang-ky[/*]
  // ============================================================================
  if (isApplyRoute && currentSlug) {
    const applyPet =
      adoptionPets.find((p) => p.slug === currentSlug || p.id === currentSlug) || null;
    return (
      <AdoptionApplyPage
        lang={lang}
        pet={applyPet}
        onAddAdoptionRequest={onAddAdoptionRequest}
        onNavigate={onNavigate}
        onNavigateUrl={handleNavigateUrl}
        isSuccessView={isSuccessRoute}
      />
    );
  }

  const selectedPet = currentSlug
    ? adoptionPets.find((p) => p.slug === currentSlug || p.id === currentSlug) || null
    : null;

  // ============================================================================
  // DETAIL VIEW: /nhan-nuoi/{slug}
  // ============================================================================
  if (selectedPet) {
    const adopted = isPetAdopted(selectedPet);
    const isLiked = likedPetIds.includes(selectedPet.id);
    const photos =
      selectedPet.photos && selectedPet.photos.length > 0
        ? selectedPet.photos
        : [selectedPet.photo];
    const safePhotoIdx = Math.min(activePhotoIndex, photos.length - 1);

    const speciesLabel = getSpeciesDisplayName(selectedPet.species, lang);
    const breedLabel =
      lang === 'vi' ? selectedPet.breed : selectedPet.breedEn || selectedPet.breed;
    const ageLabel =
      lang === 'vi' ? selectedPet.age : selectedPet.ageEn || selectedPet.age;
    const genderLabel = getGenderChipLabel(selectedPet.gender, lang);
    const colorLabel =
      lang === 'vi' ? selectedPet.color : selectedPet.colorEn || selectedPet.color;
    const areaLabel =
      lang === 'vi' ? selectedPet.area : selectedPet.areaEn || selectedPet.area;

    const storyParagraphs = (
      lang === 'vi' ? selectedPet.story : selectedPet.storyEn || selectedPet.story
    )
      .split('\n\n')
      .filter(Boolean);

    const personalityTags =
      (lang === 'vi'
        ? selectedPet.personalityTagsVi
        : selectedPet.personalityTagsEn) || selectedPet.tags || [];

    const goodWithList =
      (lang === 'vi' ? selectedPet.goodWithVi : selectedPet.goodWithEn) || [];

    const vaccinationsList = selectedPet.vaccinations || [];

    const otherPetsWaiting = adoptionPets
      .filter((p) => p.id !== selectedPet.id && !isPetAdopted(p))
      .slice(0, 3);

    const handleTouchStart = (e: React.TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (touchStartXRef.current === null) return;
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          setActivePhotoIndex((prev) => (prev + 1) % photos.length);
        } else {
          setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
        }
      }
      touchStartXRef.current = null;
    };

    return (
      <div
        data-testid="page-adopt-detail"
        className="pt-24 pb-28 md:pb-20"
      >
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          {/* 1. "← Quay lại" */}
          <div className="flex flex-wrap items-center justify-end gap-4">
            <button
              type="button"
              data-testid="adopt-detail-back-btn"
              onClick={() => navigateToSlug(null)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-bold transition-colors hover:border-[#FF7F6B] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--primary)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Quay lại' : 'Back'}</span>
            </button>
          </div>

          {/* 2. Two Columns on Desktop: Left = Photo Gallery, Right = Info Card */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Photo Gallery (Main photo + 3-5 thumbnails, swipe on mobile) */}
            <div className="lg:col-span-6 space-y-4">
              <div
                className="relative aspect-square rounded-[24px] overflow-hidden border select-none"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={photos[safePhotoIdx]}
                  alt={`${selectedPet.name} - ${safePhotoIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ objectPosition: 'center 30%' }}
                />

                {/* Prev / Next Gallery Arrows */}
                {photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label={lang === 'vi' ? 'Ảnh trước' : 'Previous photo'}
                      onClick={() =>
                        setActivePhotoIndex(
                          (prev) => (prev - 1 + photos.length) % photos.length
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-transform hover:scale-105 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                        color: 'var(--primary)',
                      }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      aria-label={lang === 'vi' ? 'Ảnh tiếp theo' : 'Next photo'}
                      onClick={() =>
                        setActivePhotoIndex((prev) => (prev + 1) % photos.length)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center border shadow-md transition-transform hover:scale-105 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                        color: 'var(--primary)',
                      }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row (4 thumbnails) */}
              <div className="grid grid-cols-4 gap-3">
                {photos.map((thumbUrl, idx) => {
                  const isSelected = idx === safePhotoIdx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      data-testid={`adopt-gallery-thumb-${idx}`}
                      onClick={() => setActivePhotoIndex(idx)}
                      aria-label={`${selectedPet.name} ${
                        lang === 'vi' ? 'ảnh' : 'photo'
                      } ${idx + 1}`}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B] ${
                        isSelected ? 'scale-[1.02]' : 'opacity-75 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: isSelected ? '#FF7F6B' : 'var(--border)',
                        backgroundColor: 'var(--surface-2)',
                      }}
                    >
                      <img
                        src={thumbUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Info Card */}
            <div
              className="lg:col-span-6 rounded-[24px] border p-6 sm:p-8 space-y-6"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              {/* Status Ribbon & Wishlist Heart */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className="px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wide"
                  style={{
                    backgroundColor: adopted ? '#6B7280' : '#FF7F6B',
                    color: '#FFFFFF',
                  }}
                >
                  {adopted
                    ? lang === 'vi'
                      ? 'Đã có gia đình'
                      : 'Adopted'
                    : lang === 'vi'
                    ? 'Đang chờ gia đình'
                    : 'Waiting for a family'}
                </span>

                <button
                  type="button"
                  aria-pressed={isLiked}
                  aria-label={
                    lang === 'vi'
                      ? `${isLiked ? 'Bỏ yêu thích' : 'Yêu thích'} ${selectedPet.name}`
                      : `${isLiked ? 'Remove from wishlist' : 'Save to wishlist'} ${
                          selectedPet.name
                        }`
                  }
                  onClick={() => handleToggleLike(selectedPet.id)}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
                  style={{
                    backgroundColor: isLiked ? '#FFF0EE' : 'var(--surface-2)',
                    borderColor: isLiked ? '#FF7F6B' : 'var(--border)',
                    color: isLiked ? '#FF7F6B' : 'var(--text-muted)',
                  }}
                >
                  <Heart
                    className={`w-4.5 h-4.5 ${
                      isLiked ? 'fill-[#FF7F6B] text-[#FF7F6B]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Pet Name (Baloo 2, 40px) */}
              <div>
                <h1
                  data-testid="adopt-detail-name"
                  className="font-heading text-[34px] sm:text-[40px] font-bold leading-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  {selectedPet.name}
                </h1>
                <p
                  className="text-base font-medium mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {lang === 'vi'
                    ? selectedPet.personality
                    : selectedPet.personalityEn || selectedPet.personality}
                </p>
              </div>

              {/* Key Attributes Grid: species, breed, age, gender, weight, color, area */}
              <div
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl border"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div>
                  <span
                    className="text-xs font-semibold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Loài' : 'Species'}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {speciesLabel}
                  </span>
                </div>
                <div>
                  <span
                    className="text-xs font-semibold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Giống' : 'Breed'}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {breedLabel}
                  </span>
                </div>
                <div>
                  <span
                    className="text-xs font-semibold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Độ tuổi' : 'Age'}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {ageLabel}
                  </span>
                </div>
                <div>
                  <span
                    className="text-xs font-semibold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Giới tính' : 'Gender'}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {genderLabel}
                  </span>
                </div>
                <div>
                  <span
                    className="text-xs font-semibold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Cân nặng' : 'Weight'}
                  </span>
                  <span
                    className="text-sm font-bold tabular-nums"
                    style={{ color: 'var(--text)' }}
                  >
                    {selectedPet.weight}
                  </span>
                </div>
                <div>
                  <span
                    className="text-xs font-semibold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Màu sắc' : 'Color'}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--text)' }}
                  >
                    {colorLabel}
                  </span>
                </div>
                <div className="col-span-2 sm:col-span-3 pt-2 border-t flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <MapPin className="w-3.5 h-3.5" style={{ color: '#FF7F6B' }} />
                    {lang === 'vi' ? 'Khu vực:' : 'Location:'}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--primary)' }}
                  >
                    {areaLabel}
                  </span>
                </div>
              </div>

              {/* Fact Chips */}
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{genderLabel}</span>
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {selectedPet.vaccinated
                        ? lang === 'vi'
                          ? 'Đã tiêm phòng'
                          : 'Vaccinated'
                        : lang === 'vi'
                        ? 'Chưa tiêm phòng'
                        : 'Not vaccinated'}
                    </span>
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold"
                    style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>
                      {selectedPet.neutered
                        ? lang === 'vi'
                          ? 'Đã triệt sản'
                          : 'Neutered'
                        : lang === 'vi'
                        ? 'Chưa triệt sản'
                        : 'Not neutered'}
                    </span>
                  </span>
                  {selectedPet.microchip && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold tabular-nums"
                      style={{ backgroundColor: 'var(--surface-2)', color: 'var(--text)' }}
                    >
                      <Cpu className="w-3.5 h-3.5" />
                      <span>Microchip: {selectedPet.microchip}</span>
                    </span>
                  )}
                </div>

                {goodWithList.length > 0 && (
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'vi' ? 'Hòa hợp tốt với: ' : 'Good with: '}
                    <span style={{ color: 'var(--text)' }}>{goodWithList.join(' · ')}</span>
                  </p>
                )}
              </div>

              {/* Primary "Nhận nuôi {name}" button & Secondary "Gọi tư vấn: 0337 203 332" button */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  disabled={adopted}
                  data-testid="adopt-detail-primary-btn"
                  onClick={() => handleOpenApply(selectedPet.slug)}
                  className={`h-[48px] px-6 rounded-full text-[15px] font-bold inline-flex items-center justify-center gap-2 transition-colors ${
                    adopted
                      ? 'cursor-not-allowed opacity-60 bg-gray-400 text-white'
                      : 'cursor-pointer bg-[var(--primary)] text-[var(--on-primary)] hover:!bg-[#FF7F6B] hover:!text-white'
                  }`}
                >
                  <span>
                    {adopted
                      ? lang === 'vi'
                        ? `${selectedPet.name} đã có gia đình`
                        : `${selectedPet.name} is adopted`
                      : lang === 'vi'
                      ? `Nhận nuôi ${selectedPet.name}`
                      : `Adopt ${selectedPet.name}`}
                  </span>
                </button>

                <a
                  href="tel:+84337203332"
                  data-testid="adopt-detail-call-btn"
                  className="h-[48px] px-5 rounded-full border text-[14px] font-bold inline-flex items-center justify-center gap-2 transition-colors hover:border-[#FF7F6B]"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: 'var(--border)',
                    color: 'var(--primary)',
                  }}
                >
                  <Phone className="w-4 h-4 shrink-0" style={{ color: '#FF7F6B' }} />
                  <span>
                    {lang === 'vi'
                      ? 'Gọi tư vấn: 0337 203 332'
                      : 'Call advice: 0337 203 332'}
                  </span>
                </a>
              </div>
            </div>
          </section>

          {/* 3. "Câu chuyện của {name}" (Story) & 4. "Tính cách" (Personality) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 3. Story (1-2 paragraphs) */}
            <div
              className="lg:col-span-7 rounded-[24px] border p-6 sm:p-8 space-y-4"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <h2
                className="font-heading text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi'
                  ? `Câu chuyện của ${selectedPet.name}`
                  : `${selectedPet.name}'s story`}
              </h2>
              <div className="space-y-3 text-base leading-relaxed" style={{ color: 'var(--text)' }}>
                {storyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* 4. Personality (3-5 tags) */}
            <div
              className="lg:col-span-5 rounded-[24px] border p-6 sm:p-8 space-y-4"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <h2
                className="font-heading text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Tính cách' : 'Personality'}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi'
                  ? selectedPet.personality
                  : selectedPet.personalityEn || selectedPet.personality}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {personalityTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      color: 'var(--primary)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 5. "Sức khỏe" (Health) & 6. "Yêu cầu với người nhận nuôi" (Adopter requirements) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 5. Health: vaccination list with status pills and last checkup date */}
            <div
              className="lg:col-span-6 rounded-[24px] border p-6 sm:p-8 space-y-5"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  className="font-heading text-2xl sm:text-3xl font-bold"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? 'Sức khỏe' : 'Health'}
                </h2>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" style={{ color: '#FF7F6B' }} />
                  <span>
                    {lang === 'vi' ? 'Khám gần nhất:' : 'Last checkup:'}{' '}
                    {selectedPet.lastCheckupDate}
                  </span>
                </span>
              </div>

              <div className="space-y-3">
                {vaccinationsList.map((vac) => {
                  const isDone = vac.status === 'vaccinated';
                  return (
                    <div
                      key={vac.id}
                      className="p-4 rounded-2xl border flex items-center justify-between gap-3"
                      style={{
                        backgroundColor: 'var(--bg)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                          {lang === 'vi' ? vac.nameVi : vac.nameEn}
                        </p>
                        <p
                          className="text-xs font-medium mt-0.5 tabular-nums"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {vac.date}
                        </p>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold shrink-0"
                        style={{
                          backgroundColor: isDone ? '#DCFCE7' : '#FEF3C7',
                          color: isDone ? '#166534' : '#92400E',
                        }}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <Clock className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {isDone
                            ? lang === 'vi'
                              ? 'Đã tiêm'
                              : 'Vaccinated'
                            : lang === 'vi'
                            ? 'Sắp đến hạn'
                            : 'Due soon'}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. Adopter Requirements: 4 bullets */}
            <div
              className="lg:col-span-6 rounded-[24px] border p-6 sm:p-8 space-y-5"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              <h2
                className="font-heading text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi'
                  ? 'Yêu cầu với người nhận nuôi'
                  : 'Adopter requirements'}
              </h2>
              <ul className="space-y-3.5">
                {ADOPTER_REQUIREMENTS.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className="w-6 h-6 rounded-full inline-flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        color: 'var(--primary)',
                      }}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: 'var(--text)' }}>
                      {lang === 'vi' ? req.vi : req.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7. "Quy trình nhận nuôi" (Process): the 4 steps expanded */}
          <section
            className="rounded-[24px] border p-6 sm:p-8 space-y-6"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <h2
              className="font-heading text-2xl sm:text-3xl font-bold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi' ? 'Quy trình nhận nuôi' : 'Adoption process'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ADOPTION_PROCESS_STEPS.map((s) => (
                <div
                  key={s.step}
                  className="p-5 rounded-2xl border space-y-2"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-full inline-flex items-center justify-center text-sm font-extrabold"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      color: 'var(--primary)',
                    }}
                  >
                    {s.step}
                  </span>
                  <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--primary)' }}>
                    {lang === 'vi' ? s.titleVi : s.titleEn}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {lang === 'vi' ? s.descVi : s.descEn}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. "Các bé khác đang chờ" (Other pets waiting): 3 cards */}
          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <h2
                className="font-heading text-2xl sm:text-3xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Các bé khác đang chờ' : 'Other pets waiting'}
              </h2>
              <button
                type="button"
                onClick={() => navigateToSlug(null)}
                className="text-sm font-bold hover:underline cursor-pointer"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Xem tất cả →' : 'See all →'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {otherPetsWaiting.map((otherPet) => (
                <AdoptionPetCard
                  key={otherPet.id}
                  pet={otherPet}
                  lang={lang}
                  isLiked={likedPetIds.includes(otherPet.id)}
                  onToggleLike={handleToggleLike}
                  onOpenProfile={(p) => navigateToSlug(p.slug)}
                  onOpenAdoptForm={(p) => handleOpenApply(p.slug)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Mobile Sticky Bottom Bar with "Nhận nuôi {name}" */}
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 py-2.5 border-t flex items-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div className="min-w-0">
            <p
              className="font-heading text-base font-bold truncate"
              style={{ color: 'var(--primary)' }}
            >
              {selectedPet.name}
            </p>
            <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
              {breedLabel} · {ageLabel}
            </p>
          </div>
          <button
            type="button"
            disabled={adopted}
            onClick={() => handleOpenApply(selectedPet.slug)}
            className={`h-[42px] px-5 rounded-full text-xs font-bold shrink-0 ${
              adopted
                ? 'bg-gray-400 text-white opacity-60 cursor-not-allowed'
                : 'bg-[var(--primary)] text-[var(--on-primary)] cursor-pointer'
            }`}
          >
            {adopted
              ? lang === 'vi'
                ? 'Đã có gia đình'
                : 'Adopted'
              : lang === 'vi'
              ? `Nhận nuôi ${selectedPet.name}`
              : `Adopt ${selectedPet.name}`}
          </button>
        </div>
      </div>
    );
  }

  // ============================================================================
  // LIST VIEW: /nhan-nuoi
  // ============================================================================
  const ADOPTION_FAQS = [
    {
      qVi: 'Chi phí nhận nuôi tại trạm Animora là bao nhiêu?',
      qEn: 'What is the adoption fee at Animora?',
      aVi: 'Animora hoạt động theo tôn chỉ cứu hộ & kết nối nhận nuôi phi lợi nhuận. Bạn KHÔNG phải trả bất kỳ khoản phí thương mại nào. Mọi bé đều được tặng kèm gói kiểm tra thú y ban đầu và Sổ tiêm chủng điện tử Animora Care. Người nhận nuôi có thể tùy tâm đóng góp quỹ y tế để hỗ trợ chi phí cho các bé cứu hộ tiếp theo.',
      aEn: 'Animora operates as a non-profit animal rescue and rehoming sanctuary. There is ZERO adoption fee. Every adopted pet receives a free comprehensive veterinary health check and an Animora Digital Health Passport. Adopters may make an optional goodwill donation to our medical fund for future rescues.',
    },
    {
      qVi: 'Quy trình xét duyệt hồ sơ đăng ký diễn ra trong bao lâu?',
      qEn: 'How long does the application review take?',
      aVi: 'Đội ngũ Animora sẽ tiếp nhận hồ sơ và liên hệ trực tiếp với bạn qua điện thoại trong vòng 24 - 48 giờ làm việc. Chúng tôi sẽ trò chuyện thân mật để hiểu thêm về điều kiện chăm sóc và sắp xếp lịch hẹn giao lưu trực tiếp với bé tại trung tâm.',
      aEn: 'Our team reviews applications and reaches out via phone/message within 24 to 48 business hours. We will have a friendly chat to understand your home environment and arrange an in-person meet-and-greet.',
    },
    {
      qVi: 'Tôi sống ở căn hộ chung cư có được nhận nuôi không?',
      qEn: 'Can I adopt if I live in an apartment?',
      aVi: 'Hoàn toàn được! Rất nhiều bé mèo, thỏ, hamster, chim và các giống chó nhỏ (Poodle, French Bulldog, Corgi) tại trạm rất quen thuộc với nếp sống căn hộ, đã biết đi vệ sinh đúng khay và không gây ồn ào. Bạn chỉ cần đảm bảo ban công có lưới an toàn và tòa nhà cho phép nuôi thú cưng.',
      aEn: 'Absolutely! Many cats, rabbits, hamsters, birds, and apartment-friendly dog breeds thrive in condominiums. They are litter/pad trained and peaceful. You just need to ensure secure balcony screening and pet-friendly building guidelines.',
    },
    {
      qVi: 'Nếu bé về nhà mới không hòa hợp với thú cưng cũ thì sao?',
      qEn: 'What if the pet does not get along with our existing pets?',
      aVi: 'Animora áp dụng chính sách "14 ngày hòa nhập cùng chuyên gia". Bác sĩ và chuyên viên hành vi Animora sẽ hướng dẫn bạn các bước làm quen từng bước (cách ly mùi hương, gặp gỡ qua rào chắn, khen thưởng). Nếu sau 14 ngày vẫn không thể hòa nhập, chúng tôi sẵn sàng đón bé trở lại trạm an toàn.',
      aEn: 'Animora provides a 14-day rehoming adaptation trial with behavioral guidance. Our specialists will guide you through scent swapping, barrier introductions, and positive reinforcement. If it doesn’t work out, you can safely return the pet without any judgment.',
    },
    {
      qVi: 'Bé được bàn giao kèm theo những giấy tờ và hỗ trợ gì?',
      qEn: 'What documents and support come with the adopted pet?',
      aVi: 'Khi đón bé, bạn sẽ nhận được: Sổ tiêm chủng điện tử Animora Care, mã số định danh Microchip quốc tế, cẩm nang dinh dưỡng cá nhân hóa và voucher giảm giá 20% trọn đời dịch vụ thú y và spa tại Animora.',
      aEn: 'When welcoming your pet home, you receive: Animora Digital Health Passport, international microchip certificate, personalized nutritional guide, and a lifetime 20% discount on veterinary and grooming services at Animora.',
    },
  ];

  const hasActiveFilters =
    activeTab !== 'All' ||
    searchQuery.trim() !== '' ||
    ageFilter !== 'all' ||
    genderFilter !== 'all' ||
    onlyVaccinated ||
    onlyNeutered ||
    onlyLiked ||
    quizSubmitted;

  return (
    <div data-testid="page-adopt" className="pt-24 pb-24 min-h-screen">
      <div className="max-w-[1200px] min-[1920px]:max-w-[1520px] mx-auto px-4 sm:px-6 space-y-8">
        {/* ================================================================= */}
        {/* PAGE INTRO HEADER                                                 */}
        {/* ================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span
              data-testid="adopt-page-eyebrow"
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
            <h1
              data-testid="adopt-page-title"
              className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--primary)',
              }}
            >
              {lang === 'vi' ? 'Mái ấm mới cho các bé' : 'Find a new friend'}
            </h1>
            <p
              data-testid="adopt-page-subtitle"
              className="text-[18px] leading-relaxed font-normal"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'vi'
                ? 'Tìm hiểu tính cách, sức khỏe và đón người bạn bốn chân về với gia đình yêu thương.'
                : 'Explore profiles, health records and welcome a four-legged friend home.'}
            </p>
          </div>

          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border self-start md:self-auto shrink-0"
            style={{
              backgroundColor: 'var(--surface-2)',
              borderColor: 'var(--border)',
              color: 'var(--primary)',
            }}
          >
            <SmallPawDecoration className="w-3.5 h-3.5" />
            <span>
              {lang === 'vi'
                ? 'Trạm cứu hộ Animora · 100% Phi thương mại'
                : 'Animora Sanctuary · 100% Non-profit'}
            </span>
          </span>
        </div>

        {/* ================================================================= */}
        {/* 1. ADOPTION HERO & MISSION BANNER */}
        {/* ================================================================= */}
        <section
          data-testid="adopt-hero-banner"
          className="relative rounded-3xl overflow-hidden border p-6 sm:p-10 transition-all duration-300"
          style={{
            background:
              'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 65%, color-mix(in srgb, var(--pink) 30%, var(--surface)) 100%)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div className="max-w-3xl space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--primary)',
              }}
            >
              <Heart className="w-3.5 h-3.5 fill-[#FF7F6B] text-[#FF7F6B]" />
              <span>
                {lang === 'vi'
                  ? 'KẾT NỐI MÁI ẤM YÊU THƯƠNG'
                  : 'CONNECTING LOVING HOMES'}
              </span>
            </div>

            <h2
              className="font-heading font-extrabold tracking-tight text-2xl sm:text-3xl lg:text-[38px] leading-[1.18]"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi'
                ? 'Trao mái ấm yêu thương, đón người bạn bốn chân về nhà'
                : 'Give a loving home, welcome a four-legged friend'}
            </h2>

            <p
              className="text-sm sm:text-base leading-relaxed font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'vi'
                ? 'Hơn 250 bé chó, mèo, thỏ và thú nhỏ đã tìm được gia đình trọn đời qua Animora. Mỗi bé tại trạm đều được bác sĩ kiểm tra sức khỏe, tiêm phòng đầy đủ và nuôi dưỡng bằng tình yêu thương vô điều kiện.'
                : 'Over 250 dogs, cats, rabbits, and small pets have found lifelong homes through Animora. Every pet in our care is vet-examined, fully vaccinated, and raised with unconditional love.'}
            </p>

            {/* Impact Metric Cards (4 stats) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div
                className="p-3.5 rounded-2xl border text-center space-y-0.5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <p className="font-heading text-xl sm:text-2xl font-extrabold" style={{ color: '#FF7F6B' }}>
                  250+
                </p>
                <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Bé đã có nhà' : 'Pets rehomed'}
                </p>
              </div>

              <div
                className="p-3.5 rounded-2xl border text-center space-y-0.5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <p className="font-heading text-xl sm:text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>
                  100%
                </p>
                <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Tiêm chủng & Sức khỏe' : 'Vet checked'}
                </p>
              </div>

              <div
                className="p-3.5 rounded-2xl border text-center space-y-0.5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <p className="font-heading text-xl sm:text-2xl font-extrabold" style={{ color: '#FF7F6B' }}>
                  0 VNĐ
                </p>
                <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Phí thương mại' : 'Adoption fee'}
                </p>
              </div>

              <div
                className="p-3.5 rounded-2xl border text-center space-y-0.5"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <p className="font-heading text-xl sm:text-2xl font-extrabold" style={{ color: 'var(--primary)' }}>
                  24/7
                </p>
                <p className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Đồng hành trọn đời' : 'Lifetime support'}
                </p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                type="button"
                data-testid="adopt-open-quiz-btn"
                onClick={() => setIsQuizOpen((prev) => !prev)}
                className="h-11 px-5 rounded-full text-sm font-bold inline-flex items-center gap-2 cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: isQuizOpen ? 'var(--surface-2)' : 'var(--primary)',
                  color: isQuizOpen ? 'var(--primary)' : 'var(--on-primary)',
                  border: isQuizOpen ? '1px solid var(--border)' : 'none',
                }}
              >
                <Sparkles className="w-4 h-4 text-[#FF7F6B]" />
                <span>
                  {isQuizOpen
                    ? lang === 'vi'
                      ? 'Đóng trắc nghiệm'
                      : 'Close match quiz'
                    : lang === 'vi'
                    ? 'Trắc nghiệm tìm bé phù hợp'
                    : 'Pet compatibility quiz'}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                }
                className="h-11 px-5 rounded-full text-sm font-bold inline-flex items-center gap-2 border transition-colors hover:border-[#FF7F6B] cursor-pointer"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                <span>{lang === 'vi' ? 'Xem các bé' : 'Explore pets'}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[var(--surface-2)]">
                  {adoptionPets.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  processSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
                }
                className="h-11 px-4 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 transition-colors hover:underline cursor-pointer"
                style={{ color: 'var(--primary)' }}
              >
                <span>{lang === 'vi' ? 'Quy trình 4 bước →' : '4-step process →'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. INTERACTIVE COMPATIBILITY MATCH-MAKER QUIZ (Expandable)         */}
        {/* ================================================================= */}
        {isQuizOpen && (
          <section
            data-testid="adopt-compatibility-quiz"
            className="rounded-3xl border p-6 sm:p-8 space-y-6 transition-all duration-300 animate-in fade-in slide-in-from-top-4"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--border)' }}>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF7F6B]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'TRẮC NGHIỆM TƯƠNG THÍCH' : 'MATCH-MAKER QUIZ'}</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                  {lang === 'vi' ? 'Tìm bé cưng phù hợp với phong cách sống của bạn' : 'Find the pet that fits your lifestyle'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsQuizOpen(false)}
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:opacity-80 cursor-pointer"
                style={{ backgroundColor: 'var(--surface-2)', borderColor: 'var(--border)', color: 'var(--text)' }}
                aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question 1: Species */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? '1. Bạn muốn nhận nuôi loài nào?' : '1. Which species do you prefer?'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['All', 'Chó', 'Mèo', 'Thỏ', 'Hamster', 'Chim'] as const).map((sp) => {
                    const isSelected = quizPrefs.preferredSpecies === sp;
                    const label =
                      sp === 'All'
                        ? lang === 'vi'
                          ? 'Tất cả'
                          : 'Any'
                        : sp === 'Chim'
                        ? lang === 'vi'
                          ? 'Chim/Vẹt'
                          : 'Birds'
                        : sp;
                    return (
                      <button
                        key={sp}
                        type="button"
                        onClick={() =>
                          setQuizPrefs((prev) => ({ ...prev, preferredSpecies: sp }))
                        }
                        className="h-10 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-2)',
                          color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                        }}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Living Space */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? '2. Không gian sống của gia đình?' : '2. Your living space?'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: 'apartment' as const,
                      vi: 'Căn hộ chung cư',
                      en: 'Apartment / Condo',
                    },
                    {
                      id: 'house_yard' as const,
                      vi: 'Nhà có sân / Vườn rộng',
                      en: 'House with yard',
                    },
                  ].map((opt) => {
                    const isSelected = quizPrefs.livingSpace === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setQuizPrefs((prev) => ({ ...prev, livingSpace: opt.id }))
                        }
                        className="h-10 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-2)',
                          color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                        }}
                      >
                        {lang === 'vi' ? opt.vi : opt.en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Daily Time */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? '3. Thời gian rảnh dành cho bé mỗi ngày?' : '3. Daily time available for pet?'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'compact' as const, vi: '< 2 tiếng', en: '< 2 hours' },
                    { id: 'moderate' as const, vi: '2 - 4 tiếng', en: '2 - 4 hours' },
                    { id: 'plenty' as const, vi: '> 4 tiếng', en: '> 4 hours' },
                  ].map((opt) => {
                    const isSelected = quizPrefs.dailyTime === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setQuizPrefs((prev) => ({ ...prev, dailyTime: opt.id }))
                        }
                        className="h-10 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-2)',
                          color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                        }}
                      >
                        {lang === 'vi' ? opt.vi : opt.en}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 4: Experience */}
              <div className="space-y-2">
                <label className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? '4. Kinh nghiệm nuôi thú cưng?' : '4. Pet parenting experience?'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      id: 'first_time' as const,
                      vi: 'Lần đầu nuôi bé',
                      en: 'First-time pet parent',
                    },
                    {
                      id: 'experienced' as const,
                      vi: 'Đã có kinh nghiệm',
                      en: 'Experienced caregiver',
                    },
                  ].map((opt) => {
                    const isSelected = quizPrefs.experience === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setQuizPrefs((prev) => ({ ...prev, experience: opt.id }))
                        }
                        className="h-10 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface-2)',
                          color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                        }}
                      >
                        {lang === 'vi' ? opt.vi : opt.en}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quiz Submit Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <button
                type="button"
                onClick={() => {
                  setQuizSubmitted(true);
                  catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="h-11 px-6 rounded-full text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: '#FF7F6B',
                  color: '#FFFFFF',
                }}
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {lang === 'vi' ? 'Xem các bé phù hợp nhất' : 'Show best matches'}
                </span>
              </button>

              {quizSubmitted && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {lang === 'vi'
                      ? '✓ Đã sắp xếp theo độ tương thích cao nhất'
                      : '✓ Sorted by highest compatibility match'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuizSubmitted(false)}
                    className="text-xs font-bold underline cursor-pointer"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Hủy kết quả trắc nghiệm' : 'Clear quiz match'}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 3. MULTI-FILTER TOOLBAR & SEARCH                                  */}
        {/* ================================================================= */}
        <section ref={catalogSectionRef} className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2
                className="font-heading text-2xl sm:text-3xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi' ? 'Danh sách các bé đang chờ bạn' : 'Pets waiting for adoption'}
              </h2>
              <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi'
                  ? `Tìm thấy ${filteredPets.length} bé phù hợp tiêu chí`
                  : `Showing ${filteredPets.length} pets matching criteria`}
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full lg:w-72">
              <input
                type="text"
                data-testid="adopt-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'vi'
                    ? 'Tìm tên bé, giống, màu lông...'
                    : 'Search name, breed, color...'
                }
                className="w-full h-11 pl-10 pr-9 rounded-full text-sm font-medium border transition-colors focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              />
              <Search
                className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: 'var(--text-muted)' }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label={lang === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
                  className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center hover:opacity-75 cursor-pointer"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Species Tabs Toolbar + Sort Dropdown */}
          <AdoptionFilterToolbar
            lang={lang}
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            counts={counts}
            sortBy={sortBy}
            onChangeSort={(s) => setSortBy(s)}
          />

          {/* Secondary Quick Filter Chips Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
            {/* Age Filter Dropdown / Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-bold uppercase tracking-wider mr-1" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi' ? 'Độ tuổi:' : 'Age:'}
              </span>
              {[
                { id: 'all' as const, vi: 'Tất cả', en: 'All' },
                { id: 'baby' as const, vi: 'Dưới 1 tuổi', en: '< 1 yr' },
                { id: 'young' as const, vi: '1 - 3 tuổi', en: '1 - 3 yrs' },
                { id: 'adult' as const, vi: '> 3 tuổi', en: '> 3 yrs' },
              ].map((opt) => {
                const active = ageFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAgeFilter(opt.id)}
                    className="h-8 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap"
                    style={{
                      backgroundColor: active ? 'var(--primary)' : 'var(--surface)',
                      color: active ? 'var(--on-primary)' : 'var(--text)',
                      borderColor: active ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {lang === 'vi' ? opt.vi : opt.en}
                  </button>
                );
              })}
            </div>

            {/* Gender Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-bold uppercase tracking-wider mr-1" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi' ? 'Giới tính:' : 'Gender:'}
              </span>
              {[
                { id: 'all' as const, vi: 'Tất cả', en: 'All' },
                { id: 'Đực' as const, vi: 'Đực', en: 'Male' },
                { id: 'Cái' as const, vi: 'Cái', en: 'Female' },
              ].map((opt) => {
                const active = genderFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGenderFilter(opt.id)}
                    className="h-8 px-3 rounded-full text-xs font-bold border transition-all cursor-pointer whitespace-nowrap"
                    style={{
                      backgroundColor: active ? 'var(--primary)' : 'var(--surface)',
                      color: active ? 'var(--on-primary)' : 'var(--text)',
                      borderColor: active ? 'var(--primary)' : 'var(--border)',
                    }}
                  >
                    {lang === 'vi' ? opt.vi : opt.en}
                  </button>
                );
              })}
            </div>

            {/* Health Toggles & Wishlist Toggle */}
            <button
              type="button"
              onClick={() => setOnlyVaccinated((prev) => !prev)}
              className="h-8 px-3 rounded-full text-xs font-bold border inline-flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: onlyVaccinated ? 'var(--surface-2)' : 'var(--surface)',
                borderColor: onlyVaccinated ? '#FF7F6B' : 'var(--border)',
                color: onlyVaccinated ? '#FF7F6B' : 'var(--text)',
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Đã tiêm phòng' : 'Vaccinated'}</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlyNeutered((prev) => !prev)}
              className="h-8 px-3 rounded-full text-xs font-bold border inline-flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: onlyNeutered ? 'var(--surface-2)' : 'var(--surface)',
                borderColor: onlyNeutered ? '#FF7F6B' : 'var(--border)',
                color: onlyNeutered ? '#FF7F6B' : 'var(--text)',
              }}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? 'Đã triệt sản' : 'Neutered'}</span>
            </button>

            <button
              type="button"
              onClick={() => setOnlyLiked((prev) => !prev)}
              className="h-8 px-3 rounded-full text-xs font-bold border inline-flex items-center gap-1 transition-all cursor-pointer whitespace-nowrap"
              style={{
                backgroundColor: onlyLiked ? '#FFF0EE' : 'var(--surface)',
                borderColor: onlyLiked ? '#FF7F6B' : 'var(--border)',
                color: onlyLiked ? '#FF7F6B' : 'var(--text)',
              }}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyLiked ? 'fill-[#FF7F6B]' : ''}`} />
              <span>
                {lang === 'vi' ? 'Bé đã lưu' : 'Saved'} ({likedPetIds.length})
              </span>
            </button>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                data-testid="adopt-reset-filters-btn"
                onClick={handleResetFilters}
                className="h-8 px-3 rounded-full text-xs font-bold inline-flex items-center gap-1 hover:underline cursor-pointer"
                style={{ color: '#FF7F6B' }}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{lang === 'vi' ? 'Xóa lọc' : 'Reset'}</span>
              </button>
            )}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4. PET CARDS GRID                                                 */}
        {/* ================================================================= */}
        {isLoading ? (
          <AdoptionSkeletonGrid count={6} />
        ) : filteredPets.length === 0 ? (
          <AdoptionEmptyState
            lang={lang}
            onResetFilter={handleResetFilters}
          />
        ) : (
          <div
            data-testid="adopt-page-cards-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1920px]:grid-cols-4 gap-6 items-stretch"
          >
            {filteredPets.map((pet) => {
              const matchResult = matchScoresMap.get(pet.id);
              const matchScore = matchResult?.score;
              const matchReason =
                lang === 'vi'
                  ? matchResult?.matchReasonsVi.join(' · ')
                  : matchResult?.matchReasonsEn.join(' · ');

              return (
                <AdoptionPetCard
                  key={pet.id}
                  pet={pet}
                  lang={lang}
                  isLiked={likedPetIds.includes(pet.id)}
                  onToggleLike={handleToggleLike}
                  onOpenProfile={(p) => navigateToSlug(p.slug)}
                  onOpenAdoptForm={(p) => handleOpenApply(p.slug)}
                  matchScore={matchScore}
                  matchReason={matchReason}
                />
              );
            })}
          </div>
        )}

        {/* ================================================================= */}
        {/* 5. 4-STEP ADOPTION PROCESS WITH PREPARATION TIPS                  */}
        {/* ================================================================= */}
        <section
          ref={processSectionRef}
          data-testid="adopt-process-section"
          className="rounded-3xl border p-6 sm:p-10 space-y-8"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span
              className="text-xs font-extrabold uppercase tracking-widest text-[#FF7F6B]"
            >
              {lang === 'vi' ? 'QUY TRÌNH NHÂN VĂN' : 'HUMANE PROCESS'}
            </span>
            <h2
              className="font-heading text-2xl sm:text-3xl font-extrabold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi'
                ? '4 bước chuẩn mực đón bé về tổ ấm mới'
                : '4 thoughtful steps to welcome your pet home'}
            </h2>
            <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              {lang === 'vi'
                ? 'Quy trình được thiết kế nhằm đảm bảo mỗi bé đều tìm được gia đình phù hợp và có cuộc sống hạnh phúc lâu dài.'
                : 'Designed to ensure every pet finds the right forever family for a happy and lasting life together.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ADOPTION_PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-2xl border space-y-3 transition-transform duration-200 hover:-translate-y-1"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="w-9 h-9 rounded-full inline-flex items-center justify-center text-sm font-extrabold"
                    style={{
                      backgroundColor: 'var(--surface-2)',
                      color: 'var(--primary)',
                    }}
                  >
                    0{step.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF7F6B]">
                    {lang === 'vi' ? step.shortVi : step.shortEn}
                  </span>
                </div>

                <h3
                  className="font-heading text-base sm:text-lg font-bold leading-snug"
                  style={{ color: 'var(--primary)' }}
                >
                  {lang === 'vi' ? step.titleVi : step.titleEn}
                </h3>

                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {lang === 'vi' ? step.descVi : step.descEn}
                </p>
              </div>
            ))}
          </div>

          {/* Adopter Preparation Checklist Box */}
          <div
            className="p-5 sm:p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4"
            style={{
              backgroundColor: 'var(--surface-2)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="space-y-1">
              <p className="font-heading text-base font-bold" style={{ color: 'var(--primary)' }}>
                {lang === 'vi'
                  ? 'Gia đình cần chuẩn bị gì trước ngày đón bé?'
                  : 'What should your family prepare before pickup day?'}
              </p>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi'
                  ? 'Bát ăn, đệm ngủ êm ái, khay vệ sinh phù hợp, thức ăn dinh dưỡng và không gian yên tĩnh 3 ngày đầu để bé làm quen.'
                  : 'Food bowls, cozy bed, potty area, age-appropriate nutrition, and a calm space for the first 3 days of adjustment.'}
              </p>
            </div>
            <a
              href={CONTACT_INFO.phoneHref}
              className="h-10 px-5 rounded-full text-xs font-bold inline-flex items-center justify-center gap-2 shrink-0 border transition-colors hover:border-[#FF7F6B]"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                color: 'var(--primary)',
              }}
            >
              <Phone className="w-3.5 h-3.5 text-[#FF7F6B]" />
              <span>{lang === 'vi' ? 'Hỏi bác sĩ tư vấn' : 'Ask our vet team'}</span>
            </a>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6. ADOPTION FAQS ACCORDION                                        */}
        {/* ================================================================= */}
        <section
          data-testid="adopt-faq-section"
          className="rounded-3xl border p-6 sm:p-10 space-y-6"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div className="text-center max-w-xl mx-auto space-y-1.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FF7F6B]">
              {lang === 'vi' ? 'HỎI ĐÁP THƯỜNG GẶP' : 'FREQUENTLY ASKED QUESTIONS'}
            </span>
            <h2
              className="font-heading text-2xl sm:text-3xl font-extrabold"
              style={{ color: 'var(--primary)' }}
            >
              {lang === 'vi' ? 'Thắc mắc về nhận nuôi thú cưng' : 'Adoption Q&A'}
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {ADOPTION_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border overflow-hidden transition-colors"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: isOpen ? 'var(--primary)' : 'var(--border)',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left font-heading text-sm sm:text-base font-bold cursor-pointer transition-colors"
                    style={{ color: 'var(--primary)' }}
                  >
                    <span>{lang === 'vi' ? faq.qVi : faq.qEn}</span>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 bg-[var(--surface-2)]">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      className="px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3"
                      style={{
                        borderColor: 'var(--border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {lang === 'vi' ? faq.aVi : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 7. SHELTER SANCTUARY VISIT & HOTLINE DIRECT CARD                  */}
        {/* ================================================================= */}
        <section
          data-testid="adopt-shelter-info-card"
          className="rounded-3xl border p-6 sm:p-8"
          style={{
            background:
              'linear-gradient(135deg, var(--surface-2) 0%, var(--surface) 100%)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF7F6B]">
                <MapPin className="w-4 h-4" />
                <span>
                  {lang === 'vi'
                    ? 'TRẠM CỨU TRỢ & KẾT NỐI NHẬN NUÔI ANIMORA'
                    : 'ANIMORA ADOPTION SANCTUARY'}
                </span>
              </div>
              <h3
                className="font-heading text-xl sm:text-2xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi'
                  ? 'Ghé thăm & giao lưu trực tiếp cùng các bé'
                  : 'Visit in person & meet the rescued pets'}
              </h3>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                {lang === 'vi'
                  ? 'Địa chỉ: 128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh & Chi nhánh Đà Nẵng'
                  : 'Address: 128 Nguyen Trai, Ben Thanh Ward, District 1, HCMC & Da Nang Sanctuary'}
              </p>
              <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text)' }}>
                <Clock className="w-3.5 h-3.5 inline mr-1.5 text-[#FF7F6B]" />
                {lang === 'vi'
                  ? 'Giờ mở cửa đón khách: 08:30 – 19:30 hàng ngày (Thứ 2 – Chủ Nhật)'
                  : 'Visiting hours: 08:30 – 19:30 daily (Monday – Sunday)'}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                href={CONTACT_INFO.phoneHref}
                data-testid="adopt-shelter-hotline-btn"
                className="h-11 px-6 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                }}
              >
                <Phone className="w-4 h-4 text-[#FF7F6B]" />
                <span>
                  {lang === 'vi'
                    ? `Hotline: ${CONTACT_INFO.phoneDisplay}`
                    : `Call: ${CONTACT_INFO.phoneDisplay}`}
                </span>
              </a>

              <a
                href={CONTACT_INFO.mailtoHref}
                className="h-11 px-6 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 border transition-colors hover:border-[#FF7F6B] cursor-pointer"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                <Mail className="w-4 h-4 text-[#FF7F6B]" />
                <span>{lang === 'vi' ? 'Gửi email cho trạm' : 'Send us an email'}</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 8. SUBMITTED ADOPTION REQUESTS TRACKER (When exists)               */}
        {/* ================================================================= */}
        {adoptionRequests.length > 0 && (
          <section
            data-testid="adopt-submitted-requests"
            className="rounded-[24px] border p-6 sm:p-8 space-y-4"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="flex items-center gap-2">
              <SmallPawDecoration className="w-5 h-5" />
              <h2
                className="font-heading text-2xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {lang === 'vi'
                  ? 'Đơn đăng ký nhận nuôi đã gửi'
                  : 'Submitted adoption requests'}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adoptionRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl border flex items-center justify-between gap-3"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                      {lang === 'vi'
                        ? `Nhận nuôi bé ${req.petName}`
                        : `Adoption request for ${req.petName}`}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {req.applicantName} · {req.phone} · {req.email}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold shrink-0"
                    style={{ backgroundColor: '#FF7F6B', color: '#FFFFFF' }}
                  >
                    {lang === 'vi' ? 'Đã tiếp nhận' : 'Received'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
