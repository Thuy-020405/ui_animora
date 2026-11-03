import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BriefcaseMedical,
  Flower2,
  GraduationCap,
  Home,
  Stethoscope,
  Check,
  CheckCircle2,
  Clock,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  Sparkles,
  Heart,
  RefreshCw,
  Copy,
  Download,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Loader2,
  PawPrint,
  Edit3,
} from 'lucide-react';
import {
  Booking,
  BookingPetTypeId,
  BookingPreferredContact,
  BookingWeightRangeId,
  Language,
  PageId,
  Pet,
  UserAccount,
} from '../../types';
import { CONTACT_INFO } from '../../config/contact';
import {
  SERVICES_DATA,
  ServiceEntity,
  ServiceIconType,
  formatServicePrice,
} from '../../data/servicesData';
import {
  TIME_SLOT_CONFIG,
  BOOKING_PET_TYPES,
  BOOKING_WEIGHT_RANGES,
  BOOKING_PREFERRED_CONTACTS,
  mapPetSpeciesToBookingPetType,
  mapWeightStringToRangeId,
  getWeightRangeLabel,
  getPetTypeLabel,
  getPreferredContactLabel,
  resolveServiceBySlugOrName,
  formatEstimatedPriceText,
  getTodayLocalIso,
  addDaysToIso,
  formatIsoDateForDisplay,
  parseVietnameseDateInput,
  isDateClosed,
  validateBookingDate,
  getTimeSlotsForDate,
  findNextAvailableDate,
  cleanBookingPhoneDigits,
  formatBookingPhoneOnBlur,
  validateBookingPhoneDigits,
  validateBookingEmail,
  validateBookingFullName,
  validateBookingPetName,
  generateServiceBookingCode,
  generateBookingIcsContent,
} from '../../data/serviceBookingData';

interface ServiceBookingPageProps {
  lang: Language;
  darkMode?: boolean;
  bookings: Booking[];
  pets: Pet[];
  currentUser: UserAccount | null;
  initialServiceSlug?: string | null;
  isSuccessRoute?: boolean;
  onAddBooking: (booking: Booking) => void;
  onNavigate: (page: PageId) => void;
  onNavigateBookingUrl: (path: string) => void;
}

const SERVICE_ICONS: Record<ServiceIconType, React.FC<{ className?: string }>> = {
  checkup: BriefcaseMedical,
  spa: Flower2,
  training: GraduationCap,
  boarding: Home,
  dental: Stethoscope,
};

const DRAFT_STORAGE_KEY = 'animora_service_booking_draft_v1';
const LAST_BOOKING_STORAGE_KEY = 'animora_last_service_booking_v1';

interface ServiceBookingDraft {
  serviceSlug: string;
  selectedSavedPetId: string | 'new';
  petType: BookingPetTypeId;
  weightRange: BookingWeightRangeId;
  date: string;
  timeSlot: string;
  fullName: string;
  phoneDigits: string;
  email: string;
  petName: string;
  petBreed: string;
  preferredContact: BookingPreferredContact;
  note: string;
  consentContact: boolean;
  vaccinatedConfirmed: boolean;
  step: 1 | 2 | 3;
}

export const ServiceBookingPage: React.FC<ServiceBookingPageProps> = ({
  lang,
  darkMode = false,
  bookings,
  pets,
  currentUser,
  initialServiceSlug,
  isSuccessRoute = false,
  onAddBooking,
  onNavigate,
  onNavigateBookingUrl,
}) => {
  const isVi = lang === 'vi';
  const todayIso = useMemo(() => getTodayLocalIso(), []);
  const defaultDateIso = useMemo(() => addDaysToIso(todayIso, 1), [todayIso]);
  const maxDateIso = useMemo(
    () => addDaysToIso(todayIso, TIME_SLOT_CONFIG.maxAdvanceDays),
    [todayIso]
  );

  // Resolve preselected service from URL ?service={slug} or prop
  const resolvedInitialService = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    const querySlug = params.get('service') || initialServiceSlug;
    return resolveServiceBySlugOrName(querySlug);
  }, [initialServiceSlug]);

  // Default values
  const createDefaultDraft = (srvSlug: string): ServiceBookingDraft => ({
    serviceSlug: srvSlug,
    selectedSavedPetId: 'new',
    petType: 'Chó',
    weightRange: 'under_5',
    date: defaultDateIso,
    timeSlot: '10:00',
    fullName: currentUser?.fullName || '',
    phoneDigits: currentUser?.phone ? cleanBookingPhoneDigits(currentUser.phone) : '',
    email: currentUser?.email || '',
    petName: '',
    petBreed: '',
    preferredContact: 'phone',
    note: '',
    consentContact: false,
    vaccinatedConfirmed: false,
    step: 1,
  });

  // Load draft from localStorage safely
  const [draftRestored, setDraftRestored] = useState(false);
  const [formState, setFormState] = useState<ServiceBookingDraft>(() => {
    const fallback = createDefaultDraft(resolvedInitialService.slug);
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ServiceBookingDraft>;
        const params = new URLSearchParams(window.location.search);
        const urlServiceParam = params.get('service');
        const effectiveServiceSlug = urlServiceParam
          ? resolveServiceBySlugOrName(urlServiceParam).slug
          : parsed.serviceSlug || fallback.serviceSlug;

        return {
          ...fallback,
          ...parsed,
          serviceSlug: effectiveServiceSlug,
          phoneDigits: cleanBookingPhoneDigits(parsed.phoneDigits || fallback.phoneDigits),
          fullName: parsed.fullName || fallback.fullName,
          email: parsed.email || fallback.email,
          step: parsed.step === 2 || parsed.step === 3 ? parsed.step : 1,
        };
      }
    } catch {
      // ignore storage errors
    }
    return fallback;
  });

  // Detect if draft existed on mount
  useEffect(() => {
    if (isSuccessRoute) return;
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.petName || parsed.phoneDigits || parsed.fullName || parsed.note)) {
          setDraftRestored(true);
        }
      }
    } catch {
      // ignore
    }
  }, [isSuccessRoute]);

  // Sync URL ?service={slug}&pet={pet} changes if navigated while mounted
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get('service');
    const petParam = params.get('pet');

    setFormState((prev) => {
      let next = { ...prev };
      if (serviceParam) {
        const srv = resolveServiceBySlugOrName(serviceParam);
        next.serviceSlug = srv.slug;
      } else if (initialServiceSlug) {
        const srv = resolveServiceBySlugOrName(initialServiceSlug);
        next.serviceSlug = srv.slug;
      }

      if (petParam && petParam.trim()) {
        const cleanPet = petParam.trim().toLowerCase();
        const matchedSavedPet = pets.find(
          (p) =>
            p.name.trim().toLowerCase() === cleanPet ||
            p.id.trim().toLowerCase() === cleanPet
        );
        if (matchedSavedPet) {
          next = {
            ...next,
            selectedSavedPetId: matchedSavedPet.id,
            petType: mapPetSpeciesToBookingPetType(matchedSavedPet.species),
            weightRange: mapWeightStringToRangeId(matchedSavedPet.weight),
            petName: matchedSavedPet.name,
            petBreed: `${matchedSavedPet.breed}${
              matchedSavedPet.age ? ` · ${matchedSavedPet.age}` : ''
            }`,
          };
        } else {
          next = {
            ...next,
            selectedSavedPetId: 'new',
            petName: petParam.trim(),
          };
        }
      }

      return next;
    });
  }, [initialServiceSlug, pets]);

  // Prefill logged-in user details if fields are still empty
  useEffect(() => {
    if (!currentUser) return;
    setFormState((prev) => ({
      ...prev,
      fullName: prev.fullName || currentUser.fullName || '',
      phoneDigits:
        prev.phoneDigits ||
        (currentUser.phone ? cleanBookingPhoneDigits(currentUser.phone) : ''),
      email: prev.email || currentUser.email || '',
    }));
  }, [currentUser]);

  // Track whether user has modified the form (for beforeunload warning & autosave)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Save draft to localStorage on change
  useEffect(() => {
    if (isSuccessRoute || !hasUnsavedChanges) return;
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(formState));
    } catch {
      // ignore storage quota errors
    }
  }, [formState, hasUnsavedChanges, isSuccessRoute]);

  // Warn before leaving only when form has unsaved data
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges && !isSuccessRoute) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, isSuccessRoute]);

  // Anti-bot & timing refs
  const mountTimeRef = useRef<number>(Date.now());
  const honeypotRef = useRef<HTMLInputElement | null>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);

  // Field refs for moving focus to the first invalid field
  const serviceGroupRef = useRef<HTMLDivElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const timeSlotGroupRef = useRef<HTMLDivElement | null>(null);
  const fullNameInputRef = useRef<HTMLInputElement | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const petNameInputRef = useRef<HTMLInputElement | null>(null);
  const consentCheckboxRef = useRef<HTMLInputElement | null>(null);

  // Phone focus state (shows raw digits on focus, formatted 4-3-3 on blur)
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  // Vietnamese formatted date text input sync (dd/mm/yyyy)
  const [viDateText, setViDateText] = useState<string>(() =>
    formatIsoDateForDisplay(formState.date, 'vi')
  );
  useEffect(() => {
    setViDateText(formatIsoDateForDisplay(formState.date, 'vi'));
  }, [formState.date]);

  // Validation & touched states
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [step1Submitted, setStep1Submitted] = useState(false);
  const [step2Submitted, setStep2Submitted] = useState(false);
  const [step3Submitted, setStep3Submitted] = useState(false);
  const [slotTakenAlert, setSlotTakenAlert] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mobile summary drawer toggle
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  // Last confirmed booking for /dat-lich/thanh-cong
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_BOOKING_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as Booking) : null;
    } catch {
      return null;
    }
  });
  const [copiedCode, setCopiedCode] = useState(false);

  // Active Service entity
  const selectedService: ServiceEntity = useMemo(
    () =>
      SERVICES_DATA.find((s) => s.slug === formState.serviceSlug) || SERVICES_DATA[0],
    [formState.serviceSlug]
  );

  // Available time slots for selected date
  const timeSlots = useMemo(
    () => getTimeSlotsForDate(formState.date, bookings),
    [formState.date, bookings]
  );

  const availableSlotsCount = useMemo(
    () => timeSlots.filter((s) => !s.disabled).length,
    [timeSlots]
  );

  // Auto-select first available slot if current slot is disabled or not set when date changes
  useEffect(() => {
    if (timeSlots.length === 0) return;
    const currentObj = timeSlots.find((s) => s.time === formState.timeSlot);
    if (!currentObj || currentObj.disabled) {
      const firstOpen = timeSlots.find((s) => !s.disabled);
      if (firstOpen) {
        setFormState((prev) => ({ ...prev, timeSlot: firstOpen.time }));
      } else {
        setFormState((prev) => ({ ...prev, timeSlot: '' }));
      }
    }
  }, [formState.date, timeSlots]);

  // Helper to update form state and mark dirty
  const updateField = <K extends keyof ServiceBookingDraft>(
    key: K,
    value: ServiceBookingDraft[K]
  ) => {
    setHasUnsavedChanges(true);
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  // Clear draft handler
  const handleClearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
    setDraftRestored(false);
    setHasUnsavedChanges(false);
    setTouched({});
    setStep1Submitted(false);
    setStep2Submitted(false);
    setStep3Submitted(false);
    setSlotTakenAlert(null);
    setSubmitError(null);
    setFormState(createDefaultDraft(resolvedInitialService.slug));
  };

  // Choose a saved pet pill
  const handleSelectSavedPet = (pet: Pet | 'new') => {
    setHasUnsavedChanges(true);
    if (pet === 'new') {
      setFormState((prev) => ({
        ...prev,
        selectedSavedPetId: 'new',
        petName: '',
        petBreed: '',
      }));
      return;
    }
    const mappedType = mapPetSpeciesToBookingPetType(pet.species);
    const mappedWeight = mapWeightStringToRangeId(pet.weight);
    setFormState((prev) => ({
      ...prev,
      selectedSavedPetId: pet.id,
      petType: mappedType,
      weightRange: mappedWeight,
      petName: pet.name,
      petBreed: `${pet.breed}${pet.age ? ` · ${pet.age}` : ''}`,
    }));
  };

  // Step 1 Validation
  const getStep1Errors = () => {
    const errs: { service?: string; date?: string; timeSlot?: string } = {};
    if (!formState.serviceSlug) {
      errs.service = isVi ? 'Vui lòng chọn một dịch vụ' : 'Please choose a service';
    }

    const dateCheck = validateBookingDate(formState.date, todayIso);
    if (!dateCheck.valid) {
      if (dateCheck.reason === 'empty') {
        errs.date = isVi ? 'Vui lòng chọn ngày hẹn' : 'Please select an appointment date';
      } else if (dateCheck.reason === 'past') {
        errs.date = isVi
          ? 'Không thể chọn ngày trong quá khứ'
          : 'Cannot select a date in the past';
      } else if (dateCheck.reason === 'too_far') {
        errs.date = isVi
          ? 'Chỉ nhận đặt lịch trước tối đa 60 ngày'
          : 'Appointments can only be booked up to 60 days ahead';
      } else if (dateCheck.reason === 'closed') {
        errs.date = isVi
          ? 'Trung tâm nghỉ bảo dưỡng định kỳ vào ngày này, vui lòng chọn ngày khác'
          : 'The center is closed on this date, please choose another day';
      }
    }

    if (!errs.date) {
      const chosenSlot = timeSlots.find((s) => s.time === formState.timeSlot);
      if (!formState.timeSlot || !chosenSlot) {
        errs.timeSlot = isVi ? 'Vui lòng chọn khung giờ hẹn' : 'Please choose a time slot';
      } else if (chosenSlot.disabled) {
        errs.timeSlot = isVi
          ? 'Khung giờ này đã hết chỗ, vui lòng chọn giờ khác'
          : 'This time slot is unavailable, please select another';
      }
    }

    return errs;
  };

  // Step 2 Validation
  const getStep2Errors = () => {
    const errs: {
      fullName?: string;
      phone?: string;
      email?: string;
      petName?: string;
    } = {};

    const nameErr = validateBookingFullName(formState.fullName, lang);
    if (nameErr) errs.fullName = nameErr;

    const phoneErr = validateBookingPhoneDigits(formState.phoneDigits, lang);
    if (phoneErr) errs.phone = phoneErr;

    const emailErr = validateBookingEmail(formState.email, lang);
    if (emailErr) errs.email = emailErr;

    const petNameErr = validateBookingPetName(formState.petName, lang);
    if (petNameErr) errs.petName = petNameErr;

    return errs;
  };

  const step1Errors = getStep1Errors();
  const step2Errors = getStep2Errors();

  // Focus step heading on step change
  const goToStep = (targetStep: 1 | 2 | 3) => {
    updateField('step', targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    requestAnimationFrame(() => {
      stepHeadingRef.current?.focus();
    });
  };

  const handleContinueFromStep1 = () => {
    setStep1Submitted(true);
    setSlotTakenAlert(null);
    const errs = getStep1Errors();
    if (Object.keys(errs).length > 0) {
      if (errs.service) serviceGroupRef.current?.focus();
      else if (errs.date) dateInputRef.current?.focus();
      else if (errs.timeSlot) timeSlotGroupRef.current?.focus();
      return;
    }
    goToStep(2);
  };

  const handleContinueFromStep2 = () => {
    setStep2Submitted(true);
    const errs = getStep2Errors();
    if (Object.keys(errs).length > 0) {
      if (errs.fullName) fullNameInputRef.current?.focus();
      else if (errs.phone) phoneInputRef.current?.focus();
      else if (errs.email) emailInputRef.current?.focus();
      else if (errs.petName) petNameInputRef.current?.focus();
      return;
    }
    goToStep(3);
  };

  // Phone input handlers (exact specification)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = cleanBookingPhoneDigits(e.target.value);
    updateField('phoneDigits', cleaned);
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const cleaned = cleanBookingPhoneDigits(pastedText);
    updateField('phoneDigits', cleaned);
  };

  const handlePhoneFocus = () => {
    setIsPhoneFocused(true);
  };

  const handlePhoneBlur = () => {
    setIsPhoneFocused(false);
    setTouched((prev) => ({ ...prev, phone: true }));
  };

  // Final Submit Handler
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep3Submitted(true);
    setSubmitError(null);

    // Honeypot check
    if (honeypotRef.current && honeypotRef.current.value) {
      return;
    }

    if (!formState.consentContact) {
      consentCheckboxRef.current?.focus();
      return;
    }

    // Re-validate Step 1 & Step 2
    const s1Errs = getStep1Errors();
    if (Object.keys(s1Errs).length > 0) {
      setStep1Submitted(true);
      goToStep(1);
      return;
    }
    const s2Errs = getStep2Errors();
    if (Object.keys(s2Errs).length > 0) {
      setStep2Submitted(true);
      goToStep(2);
      return;
    }

    // Re-check double booking for selected date & time slot
    const latestSlots = getTimeSlotsForDate(formState.date, bookings);
    const targetSlot = latestSlots.find((s) => s.time === formState.timeSlot);
    if (!targetSlot || targetSlot.disabled) {
      setSlotTakenAlert(
        isVi
          ? 'Khung giờ này vừa có người đặt, vui lòng chọn giờ khác'
          : 'This time slot was just booked, please choose another time'
      );
      goToStep(1);
      return;
    }

    setIsSubmitting(true);

    // Minimum 3-second fill time check from initial page mount
    const elapsed = Date.now() - mountTimeRef.current;
    const waitMs = elapsed < 3000 ? Math.min(800, 3000 - elapsed) : 250;
    await new Promise((resolve) => setTimeout(resolve, waitMs));

    try {
      const bookingCode = generateServiceBookingCode(bookings.length);
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        code: bookingCode,
        userId: currentUser?.id || null,
        serviceSlug: selectedService.slug,
        service: selectedService.name.vi,
        petType: formState.petType,
        petName: formState.petName.trim(),
        petBreed: formState.petBreed.trim() || undefined,
        weightRange: selectedService.dependsOnWeight ? formState.weightRange : undefined,
        date: formState.date,
        timeSlot: formState.timeSlot,
        fullName: formState.fullName.trim(),
        phone: formatBookingPhoneOnBlur(formState.phoneDigits),
        email: formState.email.trim(),
        preferredContact: formState.preferredContact,
        note: formState.note.trim() || undefined,
        vaccinatedConfirmed:
          selectedService.id === 'spa' || selectedService.id === 'boarding'
            ? formState.vaccinatedConfirmed
            : undefined,
        status: 'Mới',
        createdAt: new Date().toISOString(),
      };

      onAddBooking(newBooking);
      setConfirmedBooking(newBooking);

      try {
        localStorage.setItem(LAST_BOOKING_STORAGE_KEY, JSON.stringify(newBooking));
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore storage errors
      }

      setHasUnsavedChanges(false);
      setDraftRestored(false);
      setIsSubmitting(false);
      onNavigateBookingUrl('/dat-lich/thanh-cong');
    } catch {
      setIsSubmitting(false);
      setSubmitError(
        isVi
          ? 'Không thể lưu lịch hẹn lúc này. Vui lòng thử lại.'
          : 'Could not save your appointment right now. Please try again.'
      );
    }
  };

  // Copy booking code
  const handleCopyBookingCode = async (code: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      }
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2400);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2400);
    }
  };

  // Download .ics calendar file
  const handleDownloadIcs = (bk: Booking) => {
    const icsContent = generateBookingIcsContent(bk, lang);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lich-hen-animora-${(bk.code || bk.id).toLowerCase()}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const errorTextColor = darkMode ? '#FDA29B' : '#B42318';
  const SelectedServiceIcon = SERVICE_ICONS[selectedService.icon];
  const estimatedPriceDisplay = formatEstimatedPriceText(
    selectedService,
    selectedService.dependsOnWeight ? formState.weightRange : undefined,
    lang
  );

  // Quick calendar dates for convenient selection + testing (Today, Tomorrow, +2d, +3d full, +4d, +5d closed, +6d)
  const quickDates = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6].map((offset) => {
      const iso = addDaysToIso(todayIso, offset);
      const closed = isDateClosed(iso, todayIso);
      const slots = getTimeSlotsForDate(iso, bookings);
      const allFull = !closed && slots.length > 0 && slots.every((s) => s.disabled);
      return {
        iso,
        offset,
        closed,
        allFull,
        displayShort: formatIsoDateForDisplay(iso, lang),
      };
    });
  }, [todayIso, bookings, lang]);

  // =========================================================================
  // SUCCESS CONFIRMATION VIEW (/dat-lich/thanh-cong)
  // =========================================================================
  const isOnSuccessPath =
    isSuccessRoute ||
    (typeof window !== 'undefined' &&
      window.location.pathname.replace(/\/+$/, '') === '/dat-lich/thanh-cong');

  if (isOnSuccessPath) {
    const bk = confirmedBooking || {
      id: 'bk-demo',
      code: 'DL-2026-0001',
      serviceSlug: selectedService.slug,
      service: selectedService.name.vi,
      petType: formState.petType,
      petName: formState.petName || 'Mây Mây',
      weightRange: formState.weightRange,
      date: formState.date,
      timeSlot: formState.timeSlot || '10:00',
      fullName: formState.fullName || 'Nguyễn Minh Anh',
      phone: formatBookingPhoneOnBlur(formState.phoneDigits || '0912345678'),
      email: formState.email || 'minhanh@animora.vn',
      preferredContact: formState.preferredContact,
      status: 'Mới',
      createdAt: new Date().toISOString(),
    };

    const bkService = resolveServiceBySlugOrName(bk.serviceSlug || bk.service);
    const contactMethodLabel = getPreferredContactLabel(bk.preferredContact, lang);

    return (
      <div
        data-testid="page-booking-success"
        className="min-h-[80vh] pt-28 pb-24 shared-container"
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs sm:text-sm mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="hover:underline font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded"
          >
            {isVi ? 'Trang chủ' : 'Home'}
          </button>
          <span aria-hidden="true">›</span>
          <button
            type="button"
            onClick={() => onNavigateBookingUrl('/dat-lich')}
            className="hover:underline font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded"
          >
            {isVi ? 'Đặt lịch' : 'Book Service'}
          </button>
          <span aria-hidden="true">›</span>
          <span className="font-bold" style={{ color: 'var(--primary)' }}>
            {isVi ? 'Hoàn tất' : 'Confirmed'}
          </span>
        </nav>

        <div
          className="max-w-3xl mx-auto rounded-[24px] border p-6 sm:p-10 text-center space-y-8"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          {/* Big Check Icon */}
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-sm"
            style={{
              backgroundColor: 'var(--surface-2)',
              color: 'var(--primary)',
            }}
          >
            <CheckCircle2 className="w-11 h-11 stroke-[2.4]" />
          </div>

          <div className="space-y-3">
            <h1
              className="font-heading font-extrabold leading-tight"
              style={{
                fontSize: 'clamp(28px, 3.6vw, 42px)',
                color: 'var(--primary)',
              }}
            >
              {isVi ? 'Đã nhận lịch hẹn của bạn!' : 'We have received your appointment!'}
            </h1>
            <p className="text-base sm:text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
              {isVi
                ? `Chúng tôi sẽ liên hệ xác nhận qua ${contactMethodLabel} trong thời gian sớm nhất.`
                : `We will contact you via ${contactMethodLabel} as soon as possible to confirm.`}
            </p>
          </div>

          {/* Booking Code Box */}
          <div
            className="max-w-md mx-auto rounded-2xl border p-5 space-y-2"
            style={{
              backgroundColor: 'var(--surface-2)',
              borderColor: 'var(--border)',
            }}
          >
            <span
              className="block text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              {isVi ? 'MÃ LỊCH HẸN CỦA BẠN' : 'YOUR BOOKING CODE'}
            </span>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <span
                data-testid="booking-success-code"
                className="font-heading text-2xl sm:text-3xl font-extrabold tracking-wider tabular-nums"
                style={{ color: 'var(--primary)' }}
              >
                {bk.code || 'DL-2026-0001'}
              </span>
              <button
                type="button"
                data-testid="copy-booking-code-btn"
                onClick={() => handleCopyBookingCode(bk.code || 'DL-2026-0001')}
                className="min-h-[44px] px-4 py-2 rounded-full border text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  color: 'var(--primary)',
                }}
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{isVi ? 'Đã sao chép' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>{isVi ? 'Sao chép mã' : 'Copy code'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Booking Summary Box */}
          <div
            className="text-left rounded-2xl border p-5 sm:p-7 space-y-4"
            style={{
              backgroundColor: 'var(--bg)',
              borderColor: 'var(--border)',
            }}
          >
            <h2
              className="font-heading text-xl font-bold pb-3 border-b"
              style={{ color: 'var(--primary)', borderColor: 'var(--border)' }}
            >
              {isVi ? 'Tóm tắt lịch hẹn' : 'Booking summary'}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Dịch vụ' : 'Service'}
                </span>
                <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                  {bkService.name[lang]} ({bkService.duration[lang]})
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Ngày & giờ hẹn' : 'Date & time'}
                </span>
                <span className="font-bold text-base tabular-nums" style={{ color: 'var(--text)' }}>
                  {formatIsoDateForDisplay(bk.date, lang)} · {bk.timeSlot || '10:00'}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Thông tin của bé' : 'Pet details'}
                </span>
                <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                  {bk.petName ? `${bk.petName} · ` : ''}
                  {getPetTypeLabel(bk.petType, lang)}
                  {bk.weightRange ? ` · ${getWeightRangeLabel(bk.weightRange, lang)}` : ''}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Chi phí dự kiến' : 'Estimated price'}
                </span>
                <span className="font-extrabold text-base" style={{ color: 'var(--primary)' }}>
                  {formatEstimatedPriceText(bkService, bk.weightRange, lang)}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Người đặt lịch' : 'Booked by'}
                </span>
                <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                  {bk.fullName} · {bk.phone}
                </span>
              </div>

              {bk.email && (
                <div>
                  <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                    Email
                  </span>
                  <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                    {bk.email}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: Xem lịch hẹn của tôi, Đặt thêm lịch khác, Về trang chủ */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              type="button"
              data-testid="success-view-my-bookings-btn"
              onClick={() => {
                const codeParam = bk.code || 'DL-2026-0001';
                const targetPath = currentUser
                  ? '/lich-hen'
                  : `/lich-hen?code=${encodeURIComponent(codeParam)}`;
                onNavigateBookingUrl(targetPath);
              }}
              className="btn-secondary min-h-[48px] px-6 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
            >
              <Clock className="w-4 h-4" />
              <span>{isVi ? 'Xem lịch hẹn của tôi' : 'View my bookings'}</span>
            </button>

            <button
              type="button"
              data-testid="success-book-another-btn"
              onClick={() => {
                handleClearDraft();
                onNavigateBookingUrl('/dat-lich');
              }}
              className="btn-secondary min-h-[48px] px-6 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
            >
              <Calendar className="w-4 h-4" />
              <span>{isVi ? 'Đặt thêm lịch khác' : 'Book another appointment'}</span>
            </button>

            <button
              type="button"
              data-testid="success-back-home-btn"
              onClick={() => onNavigate('home')}
              className="btn-primary min-h-[48px] px-7 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 w-full sm:w-auto shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
            >
              <span>{isVi ? 'Về trang chủ' : 'Back to home'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN 3-STEP WIZARD VIEW (/dat-lich)
  // =========================================================================
  const stepTitles = {
    1: isVi ? 'Dịch vụ & thời gian' : 'Service & time',
    2: isVi ? 'Thông tin liên hệ' : 'Your details',
    3: isVi ? 'Xác nhận' : 'Review & confirm',
  };

  return (
    <div
      data-testid="page-service-booking"
      className="min-h-screen pt-24 sm:pt-28 pb-32 min-[960px]:pb-24 shared-container"
    >
      {/* Hidden Honeypot Input for Anti-Bot Protection */}
      <input
        ref={honeypotRef}
        type="text"
        name="animora_company_hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />

      {/* Page Header */}
      <header className="mb-8 space-y-2.5 max-w-2xl">
        <span
          data-testid="booking-eyebrow"
          className="block uppercase font-bold"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'var(--primary)',
          }}
        >
          {isVi ? 'ĐĂNG KÝ DỊCH VỤ' : 'SERVICE REGISTRATION'}
        </span>
        <h1
          data-testid="booking-page-title"
          className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            color: 'var(--primary)',
          }}
        >
          {isVi ? 'Đặt lịch chăm sóc cho bé' : 'Book care for your pet'}
        </h1>
        <p
          data-testid="booking-page-subtitle"
          className="text-[18px] leading-relaxed font-normal"
          style={{ color: 'var(--text-muted)' }}
        >
          {isVi
            ? 'Chọn dịch vụ, ngày giờ phù hợp. Chúng tôi sẽ xác nhận lịch trong thời gian sớm nhất.'
            : 'Choose a service and a time. We will confirm your appointment as soon as possible.'}
        </p>
      </header>

      {/* Restored Draft Notice */}
      {draftRestored && (
        <div
          data-testid="booking-draft-banner"
          role="status"
          aria-live="polite"
          className="mb-6 rounded-2xl border px-4 py-3.5 flex flex-wrap items-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--surface-2)',
            borderColor: 'var(--border)',
            color: 'var(--text)',
          }}
        >
          <div className="flex items-center gap-2.5 text-sm font-semibold">
            <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
            <span>
              {isVi ? 'Đã khôi phục bản nháp của bạn' : 'Restored your saved booking draft'}
            </span>
          </div>
          <button
            type="button"
            data-testid="clear-booking-draft-btn"
            onClick={handleClearDraft}
            className="min-h-[36px] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
            style={{ color: 'var(--primary)' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isVi ? 'Xóa bản nháp' : 'Clear draft'}</span>
          </button>
        </div>
      )}

      {/* Two Columns on Desktop (>=960px): LEFT ~62% Wizard Card, RIGHT ~38% Sticky Summary Sidebar */}
      <div className="flex flex-col min-[960px]:flex-row items-start gap-8">
        {/* ================================================================= */}
        {/* LEFT COLUMN (~62%): FORM WIZARD CARD                              */}
        {/* ================================================================= */}
        <div className="w-full min-[960px]:w-[62%] shrink-0">
          <div
            className="rounded-[24px] border p-[20px] sm:p-[32px]"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            {/* 3-Step Stepper at Top of Form Card */}
            <div className="mb-8">
              {/* Mobile Step Indicator */}
              <div className="flex sm:hidden items-center justify-between mb-3">
                <span
                  className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    color: 'var(--primary)',
                  }}
                >
                  {isVi ? `Bước ${formState.step}/3` : `Step ${formState.step}/3`}
                </span>
                <span className="text-sm font-bold" style={{ color: 'var(--primary)' }}>
                  {stepTitles[formState.step]}
                </span>
              </div>

              {/* 3 Equal-Size 40px Circles with Centered Labels & Connecting Line Behind */}
              <ol
                aria-label={isVi ? 'Các bước đặt lịch' : 'Booking steps'}
                className="relative grid grid-cols-3 items-start"
              >
                {/* Background Track Line behind circles */}
                <div
                  aria-hidden="true"
                  className="absolute top-[20px] left-[16.66%] right-[16.66%] -translate-y-1/2 h-[2px]"
                  style={{ backgroundColor: 'var(--border)' }}
                />
                {/* Active Filled Line behind circles */}
                <div
                  aria-hidden="true"
                  className="absolute top-[20px] left-[16.66%] -translate-y-1/2 h-[2px] transition-all duration-300"
                  style={{
                    backgroundColor: 'var(--primary)',
                    width:
                      formState.step === 1
                        ? '0%'
                        : formState.step === 2
                        ? '33.33%'
                        : '66.66%',
                  }}
                />

                {[
                  { step: 1 as const, labelVi: '1 Dịch vụ', labelEn: '1 Service' },
                  { step: 2 as const, labelVi: '2 Thông tin', labelEn: '2 Details' },
                  { step: 3 as const, labelVi: '3 Xác nhận', labelEn: '3 Confirm' },
                ].map((item) => {
                  const isCurrent = formState.step === item.step;
                  const isFinished = formState.step > item.step;
                  const canClick = item.step < formState.step;

                  return (
                    <li key={item.step} className="relative z-10 flex flex-col items-center">
                      <button
                        type="button"
                        disabled={!canClick && !isCurrent}
                        aria-current={isCurrent ? 'step' : undefined}
                        data-testid={`stepper-circle-${item.step}`}
                        onClick={() => {
                          if (canClick) goToStep(item.step);
                        }}
                        className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-heading text-base font-extrabold transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2 ${
                          canClick ? 'cursor-pointer' : 'cursor-default'
                        }`}
                        style={{
                          backgroundColor:
                            isCurrent || isFinished ? 'var(--primary)' : 'var(--surface)',
                          color:
                            isCurrent || isFinished
                              ? 'var(--on-primary)'
                              : 'var(--text-muted)',
                          border:
                            isCurrent || isFinished
                              ? '2px solid var(--primary)'
                              : '2px solid var(--border)',
                        }}
                      >
                        {isFinished ? <Check className="w-5 h-5 stroke-[2.5]" /> : item.step}
                      </button>
                      <span
                        className="mt-2 text-xs sm:text-[13px] font-bold text-center whitespace-nowrap"
                        style={{
                          color: isCurrent ? 'var(--primary)' : 'var(--text-muted)',
                        }}
                      >
                        {isVi ? item.labelVi : item.labelEn}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Slot Taken Alert Banner */}
            {slotTakenAlert && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-6 p-4 rounded-2xl border flex items-start gap-2.5 text-sm font-bold"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: errorTextColor,
                  color: errorTextColor,
                }}
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{slotTakenAlert}</span>
              </div>
            )}

            <form onSubmit={handleFinalSubmit} noValidate>
              {/* =========================================================== */}
              {/* STEP 1: DỊCH VỤ & THỜI GIAN                                 */}
              {/* =========================================================== */}
              {formState.step === 1 && (
                <div data-testid="booking-step-1" className="space-y-7">
                  <div className="border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="font-heading text-2xl font-extrabold focus:outline-none"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi ? 'Bước 1: Dịch vụ & thời gian' : 'Step 1: Service & time'}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      {isVi
                        ? 'Chọn gói dịch vụ chăm sóc và khung giờ trống phù hợp nhất với lịch trình của bạn.'
                        : 'Select a care package and an available time slot that fits your schedule.'}
                    </p>
                  </div>

                  {/* 1. Chọn dịch vụ (2 columns desktop, 1 mobile, real radio inputs) */}
                  <div
                    ref={serviceGroupRef}
                    tabIndex={-1}
                    role="radiogroup"
                    aria-labelledby="label-choose-service"
                    aria-required="true"
                    className="space-y-3"
                  >
                    <label
                      id="label-choose-service"
                      className="block text-[14px] font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      {isVi ? 'Chọn dịch vụ *' : 'Choose a service *'}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {SERVICES_DATA.map((srv) => {
                        const Icon = SERVICE_ICONS[srv.icon];
                        const isSelected = formState.serviceSlug === srv.slug;
                        const priceText = formatEstimatedPriceText(srv, undefined, lang);

                        return (
                          <label
                            key={srv.slug}
                            data-testid={`service-option-${srv.slug}`}
                            className="relative rounded-2xl p-4 flex items-start gap-3.5 transition-all cursor-pointer select-none focus-within:outline-2 focus-within:outline-[#FF7F6B] focus-within:outline-offset-2"
                            style={{
                              backgroundColor: isSelected
                                ? 'var(--surface-2)'
                                : 'var(--bg)',
                              border: isSelected
                                ? '2px solid var(--primary)'
                                : '1px solid var(--border)',
                            }}
                          >
                            <input
                              type="radio"
                              name="serviceSlug"
                              value={srv.slug}
                              checked={isSelected}
                              onChange={() => updateField('serviceSlug', srv.slug)}
                              className="sr-only"
                            />
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                              style={{
                                backgroundColor: 'var(--primary)',
                                color: 'var(--on-primary)',
                              }}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0 pr-6">
                              <span
                                className="block font-heading text-base font-bold leading-snug"
                                style={{ color: 'var(--text)' }}
                              >
                                {srv.name[lang]}
                              </span>
                              <span
                                className="block text-xs font-medium mt-0.5"
                                style={{ color: 'var(--text-muted)' }}
                              >
                                {srv.duration[lang]}
                              </span>
                              <span
                                className="block text-sm font-extrabold mt-1.5"
                                style={{ color: 'var(--primary)' }}
                              >
                                {priceText}
                              </span>
                            </div>

                            {isSelected && (
                              <span
                                className="w-6 h-6 rounded-full flex items-center justify-center absolute top-3.5 right-3.5"
                                style={{
                                  backgroundColor: 'var(--primary)',
                                  color: 'var(--on-primary)',
                                }}
                              >
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>

                    {step1Submitted && step1Errors.service && (
                      <p
                        role="alert"
                        aria-live="polite"
                        className="text-[14px] font-semibold flex items-center gap-1.5 pt-1"
                        style={{ color: errorTextColor }}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{step1Errors.service}</span>
                      </p>
                    )}
                  </div>

                  {/* 2. Chọn bé đã lưu (Saved Pets Row) */}
                  {pets && pets.length > 0 && (
                    <div className="space-y-2.5">
                      <span
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {isVi ? 'Chọn bé đã lưu' : 'Choose a saved pet'}
                      </span>
                      <div className="flex flex-wrap items-center gap-2.5">
                        {pets.map((p) => {
                          const isSelected = formState.selectedSavedPetId === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              data-testid={`saved-pet-pill-${p.id}`}
                              onClick={() => handleSelectSavedPet(p)}
                              className="min-h-[44px] pl-2 pr-4 py-1.5 rounded-full border text-sm font-bold inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2"
                              style={{
                                backgroundColor: isSelected
                                  ? 'var(--primary)'
                                  : 'var(--bg)',
                                color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                                borderColor: isSelected
                                  ? 'var(--primary)'
                                  : 'var(--border)',
                              }}
                            >
                              <img
                                src={p.photo}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    '/src/assets/images/about_fluffy_cat_1793177483392.jpg';
                                }}
                                className="w-7 h-7 rounded-full object-cover shrink-0 border"
                                style={{
                                  borderColor: isSelected
                                    ? 'var(--on-primary)'
                                    : 'var(--border)',
                                }}
                              />
                              <span>{p.name}</span>
                            </button>
                          );
                        })}

                        <button
                          type="button"
                          data-testid="saved-pet-pill-new"
                          onClick={() => handleSelectSavedPet('new')}
                          className="min-h-[44px] px-4 py-1.5 rounded-full border text-sm font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2"
                          style={{
                            backgroundColor:
                              formState.selectedSavedPetId === 'new'
                                ? 'var(--primary)'
                                : 'var(--bg)',
                            color:
                              formState.selectedSavedPetId === 'new'
                                ? 'var(--on-primary)'
                                : 'var(--text)',
                            borderColor:
                              formState.selectedSavedPetId === 'new'
                                ? 'var(--primary)'
                                : 'var(--border)',
                          }}
                        >
                          <PawPrint className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Bé mới' : 'New pet'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 3. Loại thú cưng (Pet Type Pills) */}
                  <div className="space-y-2.5">
                    <span
                      className="block text-[14px] font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      {isVi ? 'Loại thú cưng *' : 'Pet type *'}
                    </span>
                    <div
                      role="radiogroup"
                      aria-label={isVi ? 'Loại thú cưng' : 'Pet type'}
                      className="flex flex-wrap items-center gap-2.5"
                    >
                      {BOOKING_PET_TYPES.map((pt) => {
                        const isSelected = formState.petType === pt.id;
                        return (
                          <button
                            key={pt.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            data-testid={`pet-type-pill-${pt.id}`}
                            onClick={() => updateField('petType', pt.id)}
                            className="min-h-[44px] px-4 py-2 rounded-full border text-sm font-bold transition-all cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2"
                            style={{
                              backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg)',
                              color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                              borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                            }}
                          >
                            {isVi ? pt.labelVi : pt.labelEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Cân nặng của bé (Weight Range Pills - hidden for services that do not depend on weight) */}
                  {selectedService.dependsOnWeight && (
                    <div data-testid="weight-range-section" className="space-y-2.5">
                      <span
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {isVi ? 'Cân nặng của bé *' : "Pet's weight *"}
                      </span>
                      <div
                        role="radiogroup"
                        aria-label={isVi ? 'Cân nặng của bé' : "Pet's weight"}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
                      >
                        {BOOKING_WEIGHT_RANGES.map((wr) => {
                          const isSelected = formState.weightRange === wr.id;
                          return (
                            <button
                              key={wr.id}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              data-testid={`weight-pill-${wr.id}`}
                              onClick={() => updateField('weightRange', wr.id)}
                              className="min-h-[44px] px-3.5 py-2 rounded-full border text-sm font-bold transition-all cursor-pointer whitespace-nowrap text-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2"
                              style={{
                                backgroundColor: isSelected
                                  ? 'var(--primary)'
                                  : 'var(--bg)',
                                color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                                borderColor: isSelected
                                  ? 'var(--primary)'
                                  : 'var(--border)',
                              }}
                            >
                              {isVi ? wr.labelVi : wr.labelEn}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 5. Ngày hẹn (Date Picker with dd/mm/yyyy display & 60-day range) */}
                  <div className="space-y-2.5">
                    <label
                      htmlFor="booking-date-input"
                      className="block text-[14px] font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      {isVi ? 'Ngày hẹn *' : 'Appointment date *'}
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div className="relative">
                        <input
                          ref={dateInputRef}
                          id="booking-date-input"
                          data-testid="booking-date-input"
                          type="date"
                          lang={lang === 'vi' ? 'vi-VN' : 'en-US'}
                          min={todayIso}
                          max={maxDateIso}
                          value={formState.date}
                          aria-required="true"
                          onChange={(e) => {
                            setSlotTakenAlert(null);
                            updateField('date', e.target.value);
                          }}
                          className="w-full h-[52px] px-4 rounded-[14px] border text-[16px] font-semibold focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                          style={{
                            backgroundColor: 'var(--bg)',
                            borderColor:
                              step1Submitted && step1Errors.date
                                ? errorTextColor
                                : 'var(--border)',
                            color: 'var(--text)',
                          }}
                        />
                      </div>

                      {/* Formatted Display / dd/mm/yyyy Quick Input for Vietnamese */}
                      <div
                        className="h-[52px] px-4 rounded-[14px] border flex items-center justify-between text-sm"
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          borderColor: 'var(--border)',
                          color: 'var(--text)',
                        }}
                      >
                        <span className="font-semibold" style={{ color: 'var(--text-muted)' }}>
                          {isVi ? 'Ngày đã chọn:' : 'Selected date:'}
                        </span>
                        <span
                          data-testid="booking-date-formatted"
                          className="font-extrabold tabular-nums text-base"
                          style={{ color: 'var(--primary)' }}
                        >
                          {formatIsoDateForDisplay(formState.date, lang) || viDateText}
                        </span>
                      </div>
                    </div>

                    {/* Quick 7-day strip (shows open days, full days, and closed days clearly) */}
                    <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                      {quickDates.map((d) => {
                        const isSelected = formState.date === d.iso;
                        return (
                          <button
                            key={d.iso}
                            type="button"
                            disabled={d.closed}
                            data-testid={`quick-date-${d.offset}`}
                            onClick={() => updateField('date', d.iso)}
                            title={
                              d.closed
                                ? isVi
                                  ? 'Ngày nghỉ định kỳ'
                                  : 'Closed day'
                                : d.allFull
                                ? isVi
                                  ? 'Đã kín lịch'
                                  : 'Fully booked'
                                : undefined
                            }
                            className={`min-h-[40px] px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] ${
                              d.closed
                                ? 'opacity-45 cursor-not-allowed line-through'
                                : 'cursor-pointer'
                            }`}
                            style={{
                              backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg)',
                              color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                              borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                            }}
                          >
                            {d.offset === 0
                              ? isVi
                                ? `Hôm nay (${d.displayShort.slice(0, 5)})`
                                : `Today (${d.displayShort})`
                              : d.offset === 1
                              ? isVi
                                ? `Ngày mai (${d.displayShort.slice(0, 5)})`
                                : `Tomorrow (${d.displayShort})`
                              : d.displayShort}
                            {d.closed ? (isVi ? ' · Nghỉ' : ' · Closed') : ''}
                          </button>
                        );
                      })}
                    </div>

                    {step1Submitted && step1Errors.date ? (
                      <p
                        role="alert"
                        aria-live="polite"
                        className="text-[14px] font-semibold flex items-center gap-1.5"
                        style={{ color: errorTextColor }}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{step1Errors.date}</span>
                      </p>
                    ) : (
                      <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                        {isVi
                          ? 'Định dạng dd/mm/yyyy · Đặt lịch trước tối đa 60 ngày.'
                          : 'Book appointments up to 60 days in advance.'}
                      </p>
                    )}
                  </div>

                  {/* 6. Giờ hẹn (Time Slot Pills every 60 minutes) */}
                  <div
                    ref={timeSlotGroupRef}
                    tabIndex={-1}
                    className="space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {isVi ? 'Giờ hẹn *' : 'Time slot *'}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                        {isVi ? 'Mỗi khung 60 phút (08:00 – 19:00)' : '60-min slots (08:00 – 19:00)'}
                      </span>
                    </div>

                    {availableSlotsCount === 0 ? (
                      <div
                        data-testid="no-slots-message"
                        className="rounded-2xl border p-5 text-center space-y-3"
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <p className="font-bold text-base" style={{ color: 'var(--text)' }}>
                          {isVi
                            ? 'Hiện chưa có lịch trống ngày này'
                            : 'No slots available on this day'}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                          {isVi
                            ? 'Tất cả khung giờ trong ngày đã được đặt kín hoặc trung tâm nghỉ bảo dưỡng.'
                            : 'All time slots on this date are booked or the clinic is closed.'}
                        </p>
                        <button
                          type="button"
                          data-testid="try-next-day-btn"
                          onClick={() => {
                            const nextOpen = findNextAvailableDate(formState.date, bookings);
                            updateField('date', nextOpen);
                          }}
                          className="btn-primary min-h-[44px] px-5 py-2 text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>
                            {isVi ? 'Thử ngày có lịch kế tiếp' : 'Try next available day'}
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div
                        role="radiogroup"
                        aria-label={isVi ? 'Giờ hẹn' : 'Time slot'}
                        className="grid grid-cols-3 sm:grid-cols-4 gap-2.5"
                      >
                        {timeSlots.map((slot) => {
                          const isSelected =
                            !slot.disabled && formState.timeSlot === slot.time;
                          const tooltipText = slot.disabled
                            ? isVi
                              ? slot.reasonVi || 'Hết chỗ'
                              : slot.reasonEn || 'Full'
                            : undefined;

                          return (
                            <button
                              key={slot.time}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              disabled={slot.disabled}
                              title={tooltipText}
                              data-testid={`time-slot-${slot.time}`}
                              onClick={() => {
                                if (!slot.disabled) {
                                  setSlotTakenAlert(null);
                                  updateField('timeSlot', slot.time);
                                }
                              }}
                              className={`min-h-[48px] px-3 py-2 rounded-full border text-sm font-bold flex flex-col items-center justify-center transition-all tabular-nums focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2 ${
                                slot.disabled
                                  ? 'opacity-50 cursor-not-allowed'
                                  : 'cursor-pointer'
                              }`}
                              style={{
                                backgroundColor: isSelected
                                  ? 'var(--primary)'
                                  : slot.disabled
                                  ? 'var(--surface-2)'
                                  : 'var(--bg)',
                                color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                                borderColor: isSelected
                                  ? 'var(--primary)'
                                  : 'var(--border)',
                              }}
                            >
                              <span>{slot.time}</span>
                              {slot.disabled && (
                                <span
                                  className="text-[10px] font-bold leading-none mt-0.5"
                                  style={{ color: 'var(--text-muted)' }}
                                >
                                  {isVi ? 'Hết chỗ' : 'Full'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {step1Submitted && step1Errors.timeSlot && (
                      <p
                        role="alert"
                        aria-live="polite"
                        className="text-[14px] font-semibold flex items-center gap-1.5"
                        style={{ color: errorTextColor }}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{step1Errors.timeSlot}</span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 2: THÔNG TIN LIÊN HỆ                                   */}
              {/* =========================================================== */}
              {formState.step === 2 && (
                <div data-testid="booking-step-2" className="space-y-6">
                  <div className="border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="font-heading text-2xl font-extrabold focus:outline-none"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi ? 'Bước 2: Thông tin liên hệ' : 'Step 2: Your details'}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      {isVi
                        ? 'Điền thông tin của bạn và bé để đội ngũ Animora chuẩn bị chu đáo trước giờ hẹn.'
                        : 'Provide your contact and pet details so our team can prepare for your visit.'}
                    </p>
                  </div>

                  {/* Row 1: Họ tên * & Số điện thoại * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    {/* Họ tên * */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-full-name"
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {isVi ? 'Họ tên *' : 'Full name *'}
                      </label>
                      <input
                        ref={fullNameInputRef}
                        id="booking-full-name"
                        data-testid="booking-full-name"
                        type="text"
                        aria-required="true"
                        aria-invalid={
                          Boolean((touched.fullName || step2Submitted) && step2Errors.fullName)
                        }
                        value={formState.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, fullName: true }))}
                        placeholder={isVi ? 'Nguyễn Minh Anh' : 'Nguyen Minh Anh'}
                        className="w-full h-[52px] px-4 rounded-[14px] border text-[16px] focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                        style={{
                          backgroundColor: 'var(--bg)',
                          borderColor:
                            (touched.fullName || step2Submitted) && step2Errors.fullName
                              ? errorTextColor
                              : 'var(--border)',
                          color: 'var(--text)',
                        }}
                      />
                      <div className="min-h-[20px]" aria-live="polite">
                        {(touched.fullName || step2Submitted) && step2Errors.fullName ? (
                          <p
                            className="text-[14px] font-semibold flex items-center gap-1.5"
                            style={{ color: errorTextColor }}
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{step2Errors.fullName}</span>
                          </p>
                        ) : (
                          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Tối thiểu 2 ký tự' : 'At least 2 characters'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Số điện thoại * (Single source of truth: raw digits, max 10, no maxLength, no pattern) */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-phone"
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {isVi ? 'Số điện thoại *' : 'Phone number *'}
                      </label>
                      <input
                        ref={phoneInputRef}
                        id="booking-phone"
                        data-testid="booking-phone"
                        type="tel"
                        inputMode="numeric"
                        aria-required="true"
                        aria-invalid={
                          Boolean((touched.phone || step2Submitted) && step2Errors.phone)
                        }
                        value={
                          isPhoneFocused
                            ? formState.phoneDigits
                            : formatBookingPhoneOnBlur(formState.phoneDigits)
                        }
                        onChange={handlePhoneChange}
                        onPaste={handlePhonePaste}
                        onFocus={handlePhoneFocus}
                        onBlur={handlePhoneBlur}
                        placeholder="0912 345 678"
                        className="w-full h-[52px] px-4 rounded-[14px] border text-[16px] tabular-nums focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                        style={{
                          backgroundColor: 'var(--bg)',
                          borderColor:
                            (touched.phone || step2Submitted) && step2Errors.phone
                              ? errorTextColor
                              : 'var(--border)',
                          color: 'var(--text)',
                        }}
                      />
                      <div className="min-h-[20px]" aria-live="polite">
                        {(touched.phone || step2Submitted) && step2Errors.phone ? (
                          <p
                            data-testid="booking-phone-error"
                            className="text-[14px] font-semibold flex items-center gap-1.5"
                            style={{ color: errorTextColor }}
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{step2Errors.phone}</span>
                          </p>
                        ) : (
                          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                            {isVi
                              ? '10 số di động VN (03, 05, 07, 08, 09)'
                              : '10-digit VN mobile (03, 05, 07, 08, 09)'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Email * & Tên của bé * */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                    {/* Email * */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-email"
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        Email *
                      </label>
                      <input
                        ref={emailInputRef}
                        id="booking-email"
                        data-testid="booking-email"
                        type="email"
                        aria-required="true"
                        aria-invalid={
                          Boolean((touched.email || step2Submitted) && step2Errors.email)
                        }
                        value={formState.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                        placeholder="minhanh@example.com"
                        className="w-full h-[52px] px-4 rounded-[14px] border text-[16px] focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                        style={{
                          backgroundColor: 'var(--bg)',
                          borderColor:
                            (touched.email || step2Submitted) && step2Errors.email
                              ? errorTextColor
                              : 'var(--border)',
                          color: 'var(--text)',
                        }}
                      />
                      <div className="min-h-[20px]" aria-live="polite">
                        {(touched.email || step2Submitted) && step2Errors.email ? (
                          <p
                            className="text-[14px] font-semibold flex items-center gap-1.5"
                            style={{ color: errorTextColor }}
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{step2Errors.email}</span>
                          </p>
                        ) : (
                          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Nhận thông tin xác nhận lịch hẹn' : 'For booking confirmation'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Tên của bé * */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="booking-pet-name"
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {isVi ? 'Tên của bé *' : "Pet's name *"}
                      </label>
                      <input
                        ref={petNameInputRef}
                        id="booking-pet-name"
                        data-testid="booking-pet-name"
                        type="text"
                        aria-required="true"
                        aria-invalid={
                          Boolean((touched.petName || step2Submitted) && step2Errors.petName)
                        }
                        value={formState.petName}
                        onChange={(e) => updateField('petName', e.target.value)}
                        onBlur={() => setTouched((prev) => ({ ...prev, petName: true }))}
                        placeholder={isVi ? 'Ví dụ: Mây Mây, Bơ...' : 'e.g. Mochi, Bella...'}
                        className="w-full h-[52px] px-4 rounded-[14px] border text-[16px] focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                        style={{
                          backgroundColor: 'var(--bg)',
                          borderColor:
                            (touched.petName || step2Submitted) && step2Errors.petName
                              ? errorTextColor
                              : 'var(--border)',
                          color: 'var(--text)',
                        }}
                      />
                      <div className="min-h-[20px]" aria-live="polite">
                        {(touched.petName || step2Submitted) && step2Errors.petName ? (
                          <p
                            className="text-[14px] font-semibold flex items-center gap-1.5"
                            style={{ color: errorTextColor }}
                          >
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{step2Errors.petName}</span>
                          </p>
                        ) : (
                          <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Tên gọi ở nhà của bé' : "Your pet's nickname"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Giống / ghi chú về bé (optional) */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="booking-pet-breed"
                      className="block text-[14px] font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      {isVi
                        ? 'Giống / ghi chú về bé (không bắt buộc)'
                        : 'Breed / pet info (optional)'}
                    </label>
                    <input
                      id="booking-pet-breed"
                      data-testid="booking-pet-breed"
                      type="text"
                      value={formState.petBreed}
                      onChange={(e) => updateField('petBreed', e.target.value)}
                      placeholder={
                        isVi
                          ? 'Ví dụ: Poodle 2 tuổi, mèo Anh lông ngắn...'
                          : 'e.g. 2-year-old Poodle, British Shorthair...'
                      }
                      className="w-full h-[52px] px-4 rounded-[14px] border text-[16px] focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                      style={{
                        backgroundColor: 'var(--bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--text)',
                      }}
                    />
                    <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                      {isVi
                        ? 'Giống loài và độ tuổi giúp bác sĩ/kỹ thuật viên chuẩn bị dụng cụ phù hợp.'
                        : 'Breed and age help our team prepare tailored equipment.'}
                    </p>
                  </div>

                  {/* Row 4: Cách liên hệ ưa thích (Preferred Contact Pills) */}
                  <div className="space-y-2">
                    <span
                      className="block text-[14px] font-bold"
                      style={{ color: 'var(--text)' }}
                    >
                      {isVi ? 'Cách liên hệ ưa thích' : 'Preferred contact method'}
                    </span>
                    <div
                      role="radiogroup"
                      aria-label={isVi ? 'Cách liên hệ ưa thích' : 'Preferred contact method'}
                      className="flex flex-wrap items-center gap-2.5"
                    >
                      {BOOKING_PREFERRED_CONTACTS.map((c) => {
                        const isSelected = formState.preferredContact === c.id;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            data-testid={`contact-pill-${c.id}`}
                            onClick={() => updateField('preferredContact', c.id)}
                            className="min-h-[44px] px-5 py-2 rounded-full border text-sm font-bold transition-all cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#FF7F6B] focus-visible:outline-offset-2"
                            style={{
                              backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg)',
                              color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                              borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                            }}
                          >
                            {isVi ? c.labelVi : c.labelEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 5: Ghi chú thêm (Textarea, max 300 chars with counter) */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="booking-note"
                        className="block text-[14px] font-bold"
                        style={{ color: 'var(--text)' }}
                      >
                        {isVi ? 'Ghi chú thêm (không bắt buộc)' : 'Additional notes (optional)'}
                      </label>
                      <span
                        data-testid="booking-note-counter"
                        className="text-[13px] font-semibold tabular-nums"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {formState.note.length}/300
                      </span>
                    </div>
                    <textarea
                      id="booking-note"
                      data-testid="booking-note"
                      rows={3}
                      value={formState.note}
                      onChange={(e) => {
                        const val = e.target.value.slice(0, 300);
                        updateField('note', val);
                      }}
                      placeholder={
                        isVi
                          ? 'Ví dụ: Bé sợ tiếng máy sấy, nhạy cảm ở vùng tai...'
                          : 'e.g. Afraid of loud hair dryers, sensitive around ears...'
                      }
                      className="w-full p-4 rounded-[14px] border text-[16px] leading-relaxed focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                      style={{
                        backgroundColor: 'var(--bg)',
                        borderColor: 'var(--border)',
                        color: 'var(--text)',
                      }}
                    />
                    <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                      {isVi
                        ? 'Chia sẻ thói quen hoặc lưu ý sức khỏe đặc biệt của bé.'
                        : 'Share any special habits or health notes for your pet.'}
                    </p>
                  </div>
                </div>
              )}

              {/* =========================================================== */}
              {/* STEP 3: XÁC NHẬN                                            */}
              {/* =========================================================== */}
              {formState.step === 3 && (
                <div data-testid="booking-step-3" className="space-y-6">
                  <div className="border-b pb-4" style={{ borderColor: 'var(--border)' }}>
                    <h2
                      ref={stepHeadingRef}
                      tabIndex={-1}
                      className="font-heading text-2xl font-extrabold focus:outline-none"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi ? 'Bước 3: Kiểm tra & xác nhận' : 'Step 3: Review & confirm'}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                      {isVi
                        ? 'Kiểm tra lại thông tin lịch hẹn trước khi hoàn tất gửi đăng ký.'
                        : 'Review your appointment details below before submitting.'}
                    </p>
                  </div>

                  {/* Review Card with "Sửa" (Edit) links */}
                  <div
                    className="rounded-2xl border divide-y"
                    style={{
                      backgroundColor: 'var(--bg)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {/* Block 1: Service, Pet, Date & Time */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--primary)' }}>
                          {isVi ? 'Dịch vụ & Thời gian hẹn' : 'Service & Appointment Time'}
                        </h3>
                        <button
                          type="button"
                          data-testid="review-edit-step-1"
                          onClick={() => goToStep(1)}
                          className="min-h-[36px] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                          style={{ color: 'var(--primary)' }}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Sửa' : 'Edit'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Dịch vụ' : 'Service'}
                          </span>
                          <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                            {selectedService.name[lang]} ({selectedService.duration[lang]})
                          </span>
                        </div>

                        <div>
                          <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Chi phí dự kiến' : 'Estimated price'}
                          </span>
                          <span className="font-extrabold text-base" style={{ color: 'var(--primary)' }}>
                            {estimatedPriceDisplay}
                          </span>
                        </div>

                        <div>
                          <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Thú cưng' : 'Pet'}
                          </span>
                          <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                            {formState.petName} ({getPetTypeLabel(formState.petType, lang)}
                            {selectedService.dependsOnWeight
                              ? ` · ${getWeightRangeLabel(formState.weightRange, lang)}`
                              : ''}
                            )
                          </span>
                        </div>

                        <div>
                          <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Ngày & giờ hẹn' : 'Date & time'}
                          </span>
                          <span className="font-bold text-base tabular-nums" style={{ color: 'var(--text)' }}>
                            {formatIsoDateForDisplay(formState.date, lang)} · {formState.timeSlot}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Block 2: Contact Details & Note */}
                    <div
                      className="p-5 space-y-3"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--primary)' }}>
                          {isVi ? 'Thông tin liên hệ & Ghi chú' : 'Contact Details & Notes'}
                        </h3>
                        <button
                          type="button"
                          data-testid="review-edit-step-2"
                          onClick={() => goToStep(2)}
                          className="min-h-[36px] px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                          style={{ color: 'var(--primary)' }}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>{isVi ? 'Sửa' : 'Edit'}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Họ tên & Điện thoại' : 'Name & Phone'}
                          </span>
                          <span className="font-bold text-base tabular-nums" style={{ color: 'var(--text)' }}>
                            {formState.fullName} ·{' '}
                            {formatBookingPhoneOnBlur(formState.phoneDigits)}
                          </span>
                        </div>

                        <div>
                          <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                            {isVi ? 'Email & Liên hệ qua' : 'Email & Preferred contact'}
                          </span>
                          <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                            {formState.email} ({getPreferredContactLabel(formState.preferredContact, lang)})
                          </span>
                        </div>

                        {formState.petBreed && (
                          <div className="sm:col-span-2">
                            <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                              {isVi ? 'Giống / thông tin bé' : 'Breed / pet info'}
                            </span>
                            <span className="font-semibold" style={{ color: 'var(--text)' }}>
                              {formState.petBreed}
                            </span>
                          </div>
                        )}

                        {formState.note && (
                          <div className="sm:col-span-2">
                            <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                              {isVi ? 'Ghi chú thêm' : 'Additional note'}
                            </span>
                            <span className="font-semibold" style={{ color: 'var(--text)' }}>
                              {formState.note}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Checkboxes (Consent required + Vaccine optional for grooming/boarding) */}
                  <div className="space-y-3 pt-1">
                    <label
                      htmlFor="booking-consent-checkbox"
                      className="flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer select-none focus-within:outline-2 focus-within:outline-[#FF7F6B]"
                      style={{
                        backgroundColor: 'var(--bg)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <input
                        ref={consentCheckboxRef}
                        id="booking-consent-checkbox"
                        data-testid="booking-consent-checkbox"
                        type="checkbox"
                        aria-required="true"
                        checked={formState.consentContact}
                        onChange={(e) => updateField('consentContact', e.target.checked)}
                        className="mt-1 w-5 h-5 accent-[var(--primary)] rounded shrink-0"
                      />
                      <span className="text-sm font-bold leading-relaxed" style={{ color: 'var(--text)' }}>
                        {isVi
                          ? 'Tôi đồng ý để Animora liên hệ xác nhận lịch hẹn *'
                          : 'I agree to let Animora contact me to confirm the appointment *'}
                      </span>
                    </label>

                    {(selectedService.id === 'spa' || selectedService.id === 'boarding') && (
                      <label
                        htmlFor="booking-vaccine-checkbox"
                        className="flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer select-none focus-within:outline-2 focus-within:outline-[#FF7F6B]"
                        style={{
                          backgroundColor: 'var(--bg)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        <input
                          id="booking-vaccine-checkbox"
                          data-testid="booking-vaccine-checkbox"
                          type="checkbox"
                          checked={formState.vaccinatedConfirmed}
                          onChange={(e) => updateField('vaccinatedConfirmed', e.target.checked)}
                          className="mt-1 w-5 h-5 accent-[var(--primary)] rounded shrink-0"
                        />
                        <span className="text-sm font-semibold leading-relaxed" style={{ color: 'var(--text)' }}>
                          {isVi
                            ? 'Bé đã được tiêm phòng đầy đủ theo khuyến cáo'
                            : 'My pet is up to date on recommended vaccinations'}
                        </span>
                      </label>
                    )}

                    {/* Privacy consent & Cancellation policy notes */}
                    <div className="space-y-1.5 pt-2 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                      <p>
                        {isVi
                          ? 'Thông tin của bạn chỉ được dùng để xử lý lịch hẹn và liên hệ với bạn.'
                          : 'Your information is only used to process your appointment and contact you.'}
                      </p>
                      <p className="font-semibold" style={{ color: 'var(--text)' }}>
                        {isVi
                          ? 'Bạn có thể đổi hoặc hủy lịch miễn phí trước 24 giờ.'
                          : 'You can reschedule or cancel for free up to 24 hours in advance.'}
                      </p>
                    </div>
                  </div>

                  {/* Submit Error + Retry Button */}
                  {submitError && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-4 rounded-2xl border flex items-center justify-between gap-3"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        borderColor: errorTextColor,
                        color: errorTextColor,
                      }}
                    >
                      <span className="text-sm font-bold">{submitError}</span>
                      <button
                        type="submit"
                        className="btn-primary px-4 py-2 text-xs font-bold shrink-0"
                      >
                        {isVi ? 'Thử lại' : 'Retry'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* =========================================================== */}
              {/* MOBILE COMPACT SUMMARY BAR (<960px, pinned above buttons)   */}
              {/* =========================================================== */}
              <div
                data-testid="mobile-booking-summary-bar"
                className="min-[960px]:hidden mt-8 rounded-2xl border p-4 space-y-3"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <span className="block text-xs font-bold truncate" style={{ color: 'var(--text-muted)' }}>
                      {selectedService.name[lang]} · {formatIsoDateForDisplay(formState.date, lang)}{' '}
                      {formState.timeSlot ? `· ${formState.timeSlot}` : ''}
                    </span>
                    <span
                      className="font-heading text-lg font-extrabold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {estimatedPriceDisplay}
                    </span>
                  </div>

                  <button
                    type="button"
                    data-testid="mobile-summary-toggle-btn"
                    aria-expanded={mobileSummaryOpen}
                    onClick={() => setMobileSummaryOpen((prev) => !prev)}
                    className="min-h-[44px] px-3.5 py-2 rounded-full border text-xs font-bold inline-flex items-center gap-1 shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--primary)',
                    }}
                  >
                    <span>
                      {mobileSummaryOpen
                        ? isVi
                          ? 'Ẩn tóm tắt'
                          : 'Hide summary'
                        : isVi
                        ? 'Xem tóm tắt'
                        : 'View summary'}
                    </span>
                    {mobileSummaryOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {mobileSummaryOpen && (
                  <div
                    className="pt-3 border-t space-y-2 text-xs"
                    style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
                  >
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>
                        {isVi ? 'Thời lượng:' : 'Duration:'}
                      </span>
                      <span className="font-bold">{selectedService.duration[lang]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--text-muted)' }}>
                        {isVi ? 'Thú cưng:' : 'Pet:'}
                      </span>
                      <span className="font-bold">
                        {formState.petName ? `${formState.petName} · ` : ''}
                        {getPetTypeLabel(formState.petType, lang)}
                        {selectedService.dependsOnWeight
                          ? ` (${getWeightRangeLabel(formState.weightRange, lang)})`
                          : ''}
                      </span>
                    </div>
                    <p className="text-[11px] pt-1" style={{ color: 'var(--text-muted)' }}>
                      {isVi
                        ? 'Giá cuối cùng phụ thuộc cân nặng và tình trạng của bé'
                        : "Final price depends on your pet's weight and condition"}
                    </p>
                  </div>
                )}
              </div>

              {/* =========================================================== */}
              {/* BOTTOM WIZARD ACTION BUTTONS                                */}
              {/* =========================================================== */}
              <div
                className="mt-7 pt-6 border-t flex items-center justify-between gap-4"
                style={{ borderColor: 'var(--border)' }}
              >
                {formState.step > 1 ? (
                  <button
                    type="button"
                    data-testid="wizard-back-btn"
                    onClick={() => goToStep((formState.step - 1) as 1 | 2)}
                    className="btn-secondary min-h-[48px] px-6 py-3 text-sm sm:text-base font-bold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                  >
                    {isVi ? 'Quay lại' : 'Back'}
                  </button>
                ) : (
                  <div />
                )}

                {formState.step === 1 && (
                  <button
                    type="button"
                    data-testid="wizard-continue-step-1"
                    onClick={handleContinueFromStep1}
                    className="btn-primary min-h-[48px] px-8 py-3 text-sm sm:text-base font-bold shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                  >
                    {isVi ? 'Tiếp tục' : 'Continue'}
                  </button>
                )}

                {formState.step === 2 && (
                  <button
                    type="button"
                    data-testid="wizard-continue-step-2"
                    onClick={handleContinueFromStep2}
                    className="btn-primary min-h-[48px] px-8 py-3 text-sm sm:text-base font-bold shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                  >
                    {isVi ? 'Tiếp tục' : 'Continue'}
                  </button>
                )}

                {formState.step === 3 && (
                  <button
                    type="submit"
                    data-testid="wizard-submit-btn"
                    disabled={!formState.consentContact || isSubmitting}
                    className="btn-primary min-h-[48px] px-8 py-3 text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    <span>{isVi ? 'Gửi đăng ký' : 'Submit booking'}</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN (~38%): STICKY LIVE BOOKING SUMMARY SIDEBAR          */}
        {/* ================================================================= */}
        <aside
          data-testid="booking-summary-sidebar"
          className="w-full min-[960px]:w-[38%] min-[960px]:sticky space-y-5"
          style={{ top: 'calc(var(--nav-h) + 24px)' }}
        >
          {/* 1. Live "Tóm tắt lịch hẹn" Card */}
          <div
            className="rounded-[24px] border p-6 sm:p-7 space-y-5"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2
                className="font-heading text-2xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {isVi ? 'Tóm tắt lịch hẹn' : 'Booking summary'}
              </h2>
            </div>

            {/* Selected Service with Icon, Name, Duration */}
            <div className="flex items-start gap-3.5">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--on-primary)',
                }}
              >
                <SelectedServiceIcon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Dịch vụ đã chọn' : 'Selected service'}
                </span>
                <h3
                  data-testid="summary-service-name"
                  className="font-heading text-xl font-bold leading-snug"
                  style={{ color: 'var(--text)' }}
                >
                  {selectedService.name[lang]}
                </h3>
                <span className="text-xs font-semibold flex items-center gap-1 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  <Clock className="w-3.5 h-3.5" style={{ color: 'var(--coral)' }} />
                  {selectedService.duration[lang]}
                </span>
              </div>
            </div>

            {/* Live Details Rows: Pet, Date & Time */}
            <div
              className="space-y-3 pt-4 border-t text-sm"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <span style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Thú cưng:' : 'Pet:'}
                </span>
                <span
                  data-testid="summary-pet-info"
                  className="font-bold text-right"
                  style={{ color: 'var(--text)' }}
                >
                  {formState.petName ? `${formState.petName} · ` : ''}
                  {getPetTypeLabel(formState.petType, lang)}
                  {selectedService.dependsOnWeight
                    ? ` · ${getWeightRangeLabel(formState.weightRange, lang)}`
                    : ''}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <span style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Ngày & giờ:' : 'Date & time:'}
                </span>
                <span
                  data-testid="summary-datetime"
                  className="font-bold text-right tabular-nums"
                  style={{ color: 'var(--text)' }}
                >
                  {formatIsoDateForDisplay(formState.date, lang)}
                  {formState.timeSlot ? ` · ${formState.timeSlot}` : ''}
                </span>
              </div>
            </div>

            {/* Estimated Price Box */}
            <div
              className="rounded-2xl p-4 space-y-1.5"
              style={{ backgroundColor: 'var(--surface-2)' }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Chi phí dự kiến' : 'Estimated price'}
                </span>
                <span
                  data-testid="summary-estimated-price"
                  className="font-heading text-2xl font-extrabold tabular-nums"
                  style={{ color: 'var(--primary)' }}
                >
                  {estimatedPriceDisplay}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {isVi
                  ? 'Giá cuối cùng phụ thuộc cân nặng và tình trạng của bé'
                  : "Final price depends on your pet's weight and condition"}
              </p>
            </div>

            {/* Support Box: "Cần hỗ trợ?" */}
            <div
              className="rounded-2xl border p-4 space-y-2.5"
              style={{
                backgroundColor: 'var(--bg)',
                borderColor: 'var(--border)',
              }}
            >
              <span className="block text-sm font-bold" style={{ color: 'var(--primary)' }}>
                {isVi ? 'Cần hỗ trợ?' : 'Need help?'}
              </span>
              <div className="space-y-1.5 text-sm">
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="flex items-center gap-2 font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded"
                  style={{ color: 'var(--text)' }}
                >
                  <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--coral)' }} />
                  <span>
                    {isVi
                      ? `Gọi: ${CONTACT_INFO.phoneDisplay}`
                      : `Call: ${CONTACT_INFO.phoneDisplay}`}
                  </span>
                </a>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 font-bold hover:underline break-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded"
                  style={{ color: 'var(--text)' }}
                >
                  <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--coral)' }} />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </div>
            </div>

            {/* Small Trust List (3 items with line icons) */}
            <ul
              className="space-y-2.5 pt-2 text-sm font-semibold"
              style={{ color: 'var(--text)' }}
            >
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                <span>
                  {isVi ? 'Xác nhận lịch nhanh' : 'Fast appointment confirmation'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                <span>
                  {isVi
                    ? 'Đổi lịch miễn phí trước 24 giờ'
                    : 'Free rescheduling up to 24h in advance'}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Heart className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                <span>
                  {isVi ? 'Đội ngũ yêu thú cưng' : 'Dedicated pet-loving team'}
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
