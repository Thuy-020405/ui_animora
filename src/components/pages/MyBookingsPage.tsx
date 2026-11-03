import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BriefcaseMedical,
  Flower2,
  GraduationCap,
  Home,
  Stethoscope,
  Calendar,
  Clock,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  XCircle,
  AlertCircle,
  PawPrint,
  Phone,
  Mail,
  X,
  ArrowLeft,
  RefreshCw,
  Download,
  RotateCcw,
  PlusCircle,
  Search,
  LogIn,
  ChevronRight,
  FileCheck2,
} from 'lucide-react';
import {
  Booking,
  BookingStatus,
  Language,
  PageId,
  Pet,
  UserAccount,
} from '../../types';
import { CONTACT_INFO } from '../../config/contact';
import {
  ServiceEntity,
  ServiceIconType,
} from '../../data/servicesData';
import {
  TIME_SLOT_CONFIG,
  resolveServiceBySlugOrName,
  formatEstimatedPriceText,
  getPetTypeLabel,
  getWeightRangeLabel,
  getTodayLocalIso,
  addDaysToIso,
  formatIsoDateForDisplay,
  isDateClosed,
  validateBookingDate,
  getTimeSlotsForDate,
  cleanBookingPhoneDigits,
  formatBookingPhoneOnBlur,
  validateBookingPhoneDigits,
  generateBookingIcsContent,
} from '../../data/serviceBookingData';
import {
  CareRecord,
  INITIAL_CARE_RECORDS,
} from '../../data/petProfilesData';
import {
  BookingTabCategory,
  BookingSortOrder,
  CANCEL_REASON_OPTIONS,
  maskBookingPhone,
  maskBookingEmail,
  canModifyBooking,
  getUpcomingCountdownText,
  formatBookingDateWithWeekday,
  getBookingTabCategory,
  doesBookingBelongToUser,
  filterAndSortBookings,
  lookupSingleBooking,
  checkLookupRateLimit,
  evaluateAddBookingToPetProfile,
  createCareRecordFromBooking,
  buildRebookUrl,
} from '../../utils/bookingHistoryUtils';

interface MyBookingsPageProps {
  lang: Language;
  darkMode?: boolean;
  bookings: Booking[];
  pets: Pet[];
  currentUser: UserAccount | null;
  detailCode?: string | null;
  queryCode?: string | null;
  onUpdateBooking: (updated: Booking) => void;
  onNavigate: (page: PageId) => void;
  onNavigateUrl: (path: string) => void;
  onShowToast: (text: string) => void;
}

const SERVICE_ICONS: Record<ServiceIconType, React.FC<{ className?: string }>> = {
  checkup: BriefcaseMedical,
  spa: Flower2,
  training: GraduationCap,
  boarding: Home,
  dental: Stethoscope,
};

const LOOKUP_RATE_LIMIT_KEY = 'animora_booking_lookup_attempts_v1';
const CARE_RECORDS_STORAGE_KEY = 'animora_pet_care_records_v3';

export const MyBookingsPage: React.FC<MyBookingsPageProps> = ({
  lang,
  darkMode = false,
  bookings,
  pets,
  currentUser,
  detailCode = null,
  queryCode = null,
  onUpdateBooking,
  onNavigate,
  onNavigateUrl,
  onShowToast,
}) => {
  const isVi = lang === 'vi';
  const todayIso = useMemo(() => getTodayLocalIso(), []);
  const maxDateIso = useMemo(
    () => addDaysToIso(todayIso, TIME_SLOT_CONFIG.maxAdvanceDays),
    [todayIso]
  );

  // Check URL query for simulated loading/error states if needed
  const initialSimState = useMemo(() => {
    if (typeof window === 'undefined') return 'ready';
    const p = new URLSearchParams(window.location.search).get('state');
    if (p === 'loading') return 'loading';
    if (p === 'error') return 'error';
    return 'ready';
  }, []);

  const [loadState, setLoadState] = useState<'loading' | 'error' | 'ready'>(initialSimState);

  // Viewport detection for responsive detail view (Drawer >= 768px, Full page < 768px)
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileViewport(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Screen reader live announcement region
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Tabs, pet filter, and sort state
  const [activeTab, setActiveTab] = useState<BookingTabCategory>('upcoming');
  const [selectedPetFilter, setSelectedPetFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<BookingSortOrder>('nearest');
  const tabRefs = useRef<Record<BookingTabCategory, HTMLButtonElement | null>>({
    upcoming: null,
    past: null,
    cancelled: null,
  });

  // Copied booking code state
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Visitor lookup state (when !currentUser)
  const [lookupCode, setLookupCode] = useState<string>(() => queryCode || detailCode || '');
  const [lookupPhoneDigits, setLookupPhoneDigits] = useState<string>('');
  const [isLookupPhoneFocused, setIsLookupPhoneFocused] = useState(false);
  const [lookupPhoneTouched, setLookupPhoneTouched] = useState(false);
  const [lookupCodeTouched, setLookupCodeTouched] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [verifiedVisitorBookingCode, setVerifiedVisitorBookingCode] = useState<string | null>(
    null
  );
  const lookupHoneypotRef = useRef<HTMLInputElement | null>(null);

  // Sync queryCode/detailCode into lookupCode if visitor navigates with ?code=...
  useEffect(() => {
    if (queryCode || detailCode) {
      setLookupCode(queryCode || detailCode || '');
    }
  }, [queryCode, detailCode]);

  // Active detail booking code (for desktop drawer or mobile full page)
  const [openDetailCode, setOpenDetailCode] = useState<string | null>(detailCode);
  const detailTriggerRef = useRef<HTMLElement | null>(null);
  const detailDrawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpenDetailCode(detailCode);
  }, [detailCode]);

  // Cancel Dialog state
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [selectedCancelReason, setSelectedCancelReason] = useState<string>(
    CANCEL_REASON_OPTIONS[0].labelVi
  );
  const cancelTriggerRef = useRef<HTMLElement | null>(null);
  const cancelDialogRef = useRef<HTMLDivElement | null>(null);

  // Reschedule Dialog state
  const [reschedulingBooking, setReschedulingBooking] = useState<Booking | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState<string>(todayIso);
  const [rescheduleSlot, setRescheduleSlot] = useState<string>('09:00');
  const [rescheduleError, setRescheduleError] = useState<string | null>(null);
  const rescheduleTriggerRef = useRef<HTMLElement | null>(null);
  const rescheduleDialogRef = useRef<HTMLDivElement | null>(null);

  // Track CareRecords in localStorage to know which bookings were already added to Pet Profile
  const [careRecords, setCareRecords] = useState<CareRecord[]>(() => {
    try {
      const saved = localStorage.getItem(CARE_RECORDS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_CARE_RECORDS;
  });

  // Bookings belonging to the logged-in user
  const userBookings = useMemo(() => {
    if (!currentUser) return [];
    return bookings.filter((b) => doesBookingBelongToUser(b, currentUser));
  }, [bookings, currentUser]);

  // Single booking verified via guest lookup
  const verifiedVisitorBooking = useMemo(() => {
    if (currentUser || !verifiedVisitorBookingCode) return null;
    return (
      bookings.find(
        (b) =>
          (b.code || '').trim().toUpperCase() ===
          verifiedVisitorBookingCode.trim().toUpperCase()
      ) || null
    );
  }, [bookings, currentUser, verifiedVisitorBookingCode]);

  // Check if a given booking is verified for the current viewer (either logged-in owner or guest who passed lookup)
  const isBookingVerifiedForViewer = (bk: Booking | null | undefined): boolean => {
    if (!bk) return false;
    if (currentUser && doesBookingBelongToUser(bk, currentUser)) {
      return true;
    }
    if (
      !currentUser &&
      verifiedVisitorBookingCode &&
      (bk.code || '').trim().toUpperCase() ===
        verifiedVisitorBookingCode.trim().toUpperCase()
    ) {
      return true;
    }
    return false;
  };

  // Resolved detail booking (ONLY if viewer is verified owner!)
  const activeDetailBooking = useMemo(() => {
    if (!openDetailCode) return null;
    const found = bookings.find(
      (b) => (b.code || '').trim().toUpperCase() === openDetailCode.trim().toUpperCase()
    );
    if (!found || !isBookingVerifiedForViewer(found)) {
      return null;
    }
    return found;
  }, [openDetailCode, bookings, currentUser, verifiedVisitorBookingCode]);

  // Unique pet names across user's bookings for the pet filter dropdown
  const userBookingPetNames = useMemo(() => {
    const set = new Set<string>();
    userBookings.forEach((b) => {
      if (b.petName && b.petName.trim()) {
        set.add(b.petName.trim());
      }
    });
    return Array.from(set);
  }, [userBookings]);

  // Upcoming count badge (always reflects total upcoming for this user)
  const upcomingCount = useMemo(() => {
    return userBookings.filter((b) => getBookingTabCategory(b) === 'upcoming').length;
  }, [userBookings]);

  // Filtered and sorted bookings for active tab
  const displayedBookings = useMemo(() => {
    return filterAndSortBookings(userBookings, {
      tab: activeTab,
      petFilter: selectedPetFilter,
      sortOrder,
    });
  }, [userBookings, activeTab, selectedPetFilter, sortOrder]);

  // Focus trap & Escape handler for Detail Drawer, Cancel Dialog, and Reschedule Dialog
  useEffect(() => {
    const activeModalEl =
      cancelDialogRef.current ||
      rescheduleDialogRef.current ||
      (!isMobileViewport && activeDetailBooking ? detailDrawerRef.current : null);

    if (!activeModalEl) return;

    const focusableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(
      activeModalEl.querySelectorAll<HTMLElement>(focusableSelector)
    );
    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (cancellingBooking) {
          closeCancelDialog();
        } else if (reschedulingBooking) {
          closeRescheduleDialog();
        } else if (activeDetailBooking) {
          handleCloseDetail();
        }
        return;
      }

      if (e.key === 'Tab') {
        const currentFocusables = Array.from(
          activeModalEl.querySelectorAll<HTMLElement>(focusableSelector)
        );
        if (currentFocusables.length === 0) return;
        const first = currentFocusables[0];
        const last = currentFocusables[currentFocusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cancellingBooking, reschedulingBooking, activeDetailBooking, isMobileViewport]);

  // Open detail view handler
  const handleOpenDetail = (bk: Booking, triggerEl?: HTMLElement | null) => {
    if (triggerEl) {
      detailTriggerRef.current = triggerEl;
    }
    const code = bk.code || bk.id;
    setOpenDetailCode(code);
    onNavigateUrl(`/lich-hen/${encodeURIComponent(code)}`);
  };

  // Close detail view handler
  const handleCloseDetail = () => {
    setOpenDetailCode(null);
    onNavigateUrl('/lich-hen');
    requestAnimationFrame(() => {
      detailTriggerRef.current?.focus();
    });
  };

  // Copy booking code
  const handleCopyCode = async (code: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      }
    } catch {
      // ignore clipboard fallback
    }
    setCopiedCode(code);
    onShowToast(isVi ? `Đã sao chép mã ${code}` : `Copied code ${code}`);
    window.setTimeout(() => {
      setCopiedCode((prev) => (prev === code ? null : prev));
    }, 2200);
  };

  // Download .ics calendar file
  const handleDownloadIcs = (bk: Booking, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

  // Rebook ("Đặt lại") handler -> opens /dat-lich?service={slug}&pet={pet}
  const handleRebook = (bk: Booking, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const targetUrl = buildRebookUrl(bk);
    onNavigateUrl(targetUrl);
  };

  // Open Cancel Dialog
  const openCancelDialog = (bk: Booking, triggerEl?: HTMLElement | null) => {
    const check = canModifyBooking(bk);
    if (!check.allowed) return;
    if (triggerEl) cancelTriggerRef.current = triggerEl;
    setSelectedCancelReason(
      isVi ? CANCEL_REASON_OPTIONS[0].labelVi : CANCEL_REASON_OPTIONS[0].labelEn
    );
    setCancellingBooking(bk);
  };

  const closeCancelDialog = () => {
    setCancellingBooking(null);
    requestAnimationFrame(() => {
      cancelTriggerRef.current?.focus();
    });
  };

  // Confirm Cancel Booking
  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    const updated: Booking = {
      ...cancellingBooking,
      status: 'Đã hủy',
      cancelledAt: new Date().toISOString(),
      cancelReason: selectedCancelReason,
    };
    onUpdateBooking(updated);
    setCancellingBooking(null);

    const msg = isVi ? 'Đã hủy lịch hẹn' : 'Appointment cancelled';
    onShowToast(msg);
    setLiveAnnouncement(
      isVi
        ? `Đã hủy lịch hẹn ${updated.code || updated.id} thành công.`
        : `Appointment ${updated.code || updated.id} has been cancelled.`
    );
    requestAnimationFrame(() => {
      cancelTriggerRef.current?.focus();
    });
  };

  // Open Reschedule Dialog
  const openRescheduleDialog = (bk: Booking, triggerEl?: HTMLElement | null) => {
    const check = canModifyBooking(bk);
    if (!check.allowed) return;
    if (triggerEl) rescheduleTriggerRef.current = triggerEl;
    setRescheduleDate(bk.date);
    setRescheduleSlot(bk.timeSlot || '09:00');
    setRescheduleError(null);
    setReschedulingBooking(bk);
  };

  const closeRescheduleDialog = () => {
    setReschedulingBooking(null);
    setRescheduleError(null);
    requestAnimationFrame(() => {
      rescheduleTriggerRef.current?.focus();
    });
  };

  // Available slots for Reschedule Dialog (excluding the booking being rescheduled so its own slot isn't over-counted)
  const rescheduleSlots = useMemo(() => {
    if (!reschedulingBooking) return [];
    const otherBookings = bookings.filter((b) => b.id !== reschedulingBooking.id);
    return getTimeSlotsForDate(rescheduleDate, otherBookings);
  }, [rescheduleDate, bookings, reschedulingBooking]);

  // Save Rescheduled Booking
  const handleSaveReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reschedulingBooking) return;
    setRescheduleError(null);

    const dateValidation = validateBookingDate(rescheduleDate, todayIso);
    if (!dateValidation.valid) {
      setRescheduleError(
        isVi
          ? 'Ngày hẹn đã chọn không hợp lệ hoặc phòng khám nghỉ bảo dưỡng.'
          : 'Selected date is invalid or the clinic is closed.'
      );
      return;
    }

    // Re-check availability excluding this booking
    const otherBookings = bookings.filter((b) => b.id !== reschedulingBooking.id);
    const latestSlots = getTimeSlotsForDate(rescheduleDate, otherBookings);
    const targetSlot = latestSlots.find((s) => s.time === rescheduleSlot);

    if (!targetSlot || targetSlot.disabled) {
      setRescheduleError(
        isVi
          ? 'Khung giờ này vừa có người đặt, vui lòng chọn giờ khác'
          : 'This time slot was just booked, please choose another time'
      );
      return;
    }

    const historyEntry = {
      fromDate: reschedulingBooking.date,
      fromTimeSlot: reschedulingBooking.timeSlot,
      toDate: rescheduleDate,
      toTimeSlot: rescheduleSlot,
      changedAt: new Date().toISOString(),
    };

    const updated: Booking = {
      ...reschedulingBooking,
      date: rescheduleDate,
      timeSlot: rescheduleSlot,
      status: 'Mới',
      rescheduledFrom: [...(reschedulingBooking.rescheduledFrom || []), historyEntry],
    };

    onUpdateBooking(updated);
    setReschedulingBooking(null);

    const toastText = isVi
      ? 'Đã đổi giờ lịch hẹn. Chúng tôi sẽ xác nhận lại sớm nhất!'
      : 'Appointment rescheduled! Waiting for confirmation.';
    onShowToast(toastText);
    setLiveAnnouncement(toastText);
    requestAnimationFrame(() => {
      rescheduleTriggerRef.current?.focus();
    });
  };

  // Add completed booking to Pet Profile CareRecord
  const isBookingAddedToPetRecord = (bk: Booking): boolean => {
    if (bk.addedToPetRecordId) return true;
    const expectedId = `care-from-bk-${bk.code || bk.id}`;
    return careRecords.some((r) => r.id === expectedId);
  };

  const handleAddBookingToPetProfile = (bk: Booking, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const evalResult = evaluateAddBookingToPetProfile(bk, pets);
    if (!evalResult.eligible || !evalResult.matchedPet || !evalResult.careType) return;

    const newRecord = createCareRecordFromBooking(
      bk,
      evalResult.matchedPet,
      evalResult.careType
    );

    const nextRecords = careRecords.some((r) => r.id === newRecord.id)
      ? careRecords
      : [newRecord, ...careRecords];

    setCareRecords(nextRecords);
    try {
      localStorage.setItem(CARE_RECORDS_STORAGE_KEY, JSON.stringify(nextRecords));
    } catch {
      // ignore storage error
    }

    onUpdateBooking({
      ...bk,
      addedToPetRecordId: newRecord.id,
    });

    const msg = isVi
      ? `Đã thêm vào hồ sơ của bé ${evalResult.matchedPet.name}`
      : `Added to ${evalResult.matchedPet.name}'s health record`;
    onShowToast(msg);
    setLiveAnnouncement(msg);
  };

  // Visitor Lookup Form Submit
  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupCodeTouched(true);
    setLookupPhoneTouched(true);
    setLookupError(null);

    // Rate limit check (max 5 attempts per minute per browser)
    let storedTimestamps: number[] = [];
    try {
      const raw = localStorage.getItem(LOOKUP_RATE_LIMIT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) storedTimestamps = parsed;
      }
    } catch {
      // ignore
    }

    const rateCheck = checkLookupRateLimit(storedTimestamps, Date.now());
    try {
      localStorage.setItem(
        LOOKUP_RATE_LIMIT_KEY,
        JSON.stringify(rateCheck.updatedTimestamps)
      );
    } catch {
      // ignore
    }

    if (!rateCheck.allowed) {
      setLookupError(
        isVi
          ? 'Bạn đã thử quá 5 lần trong 1 phút. Vui lòng đợi ít phút rồi thử lại.'
          : 'Too many attempts (max 5 per minute). Please wait a moment and try again.'
      );
      return;
    }

    const hpVal = lookupHoneypotRef.current?.value || '';
    const result = lookupSingleBooking(
      bookings,
      lookupCode,
      lookupPhoneDigits,
      lang,
      hpVal
    );

    if (!result.found) {
      setVerifiedVisitorBookingCode(null);
      setLookupError(result.error);
      return;
    }

    setVerifiedVisitorBookingCode(result.found.code || result.found.id);
    setLookupError(null);
  };

  // Tab keyboard navigation (ArrowLeft / ArrowRight / Home / End)
  const tabOrder: BookingTabCategory[] = ['upcoming', 'past', 'cancelled'];
  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    currentTab: BookingTabCategory
  ) => {
    const idx = tabOrder.indexOf(currentTab);
    let nextTab: BookingTabCategory | null = null;
    if (e.key === 'ArrowRight') {
      nextTab = tabOrder[(idx + 1) % tabOrder.length];
    } else if (e.key === 'ArrowLeft') {
      nextTab = tabOrder[(idx - 1 + tabOrder.length) % tabOrder.length];
    } else if (e.key === 'Home') {
      nextTab = tabOrder[0];
    } else if (e.key === 'End') {
      nextTab = tabOrder[tabOrder.length - 1];
    }
    if (nextTab) {
      e.preventDefault();
      setActiveTab(nextTab);
      tabRefs.current[nextTab]?.focus();
    }
  };

  // Render Status Pill (each with an icon, never color alone, contrast >= 4.5:1)
  const renderStatusPill = (status: BookingStatus = 'Mới') => {
    switch (status) {
      case 'Mới':
        return (
          <span
            data-testid="booking-status-pill"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap border"
            style={{
              backgroundColor: 'var(--surface-2)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
            }}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>{isVi ? 'Mới' : 'New'}</span>
          </span>
        );
      case 'Đã xác nhận':
        return (
          <span
            data-testid="booking-status-pill"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap border"
            style={{
              backgroundColor: '#F4B6C2',
              color: '#3A0F1B',
              borderColor: '#E59AA8',
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{isVi ? 'Đã xác nhận' : 'Confirmed'}</span>
          </span>
        );
      case 'Hoàn thành':
        return (
          <span
            data-testid="booking-status-pill"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap border-2"
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--primary)',
              borderColor: 'var(--primary)',
            }}
          >
            <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
            <span>{isVi ? 'Hoàn thành' : 'Completed'}</span>
          </span>
        );
      case 'Đã hủy':
        return (
          <span
            data-testid="booking-status-pill"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap border"
            style={{
              backgroundColor: darkMode ? '#374151' : '#E5E7EB',
              color: darkMode ? '#F9FAFB' : '#1F2937',
              borderColor: darkMode ? '#4B5563' : '#D1D5DB',
            }}
          >
            <XCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{isVi ? 'Đã hủy' : 'Cancelled'}</span>
          </span>
        );
      case 'Không đến':
        return (
          <span
            data-testid="booking-status-pill"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap border"
            style={{
              backgroundColor: darkMode ? '#374151' : '#E5E7EB',
              color: darkMode ? '#F9FAFB' : '#1F2937',
              borderColor: darkMode ? '#4B5563' : '#D1D5DB',
            }}
          >
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{isVi ? 'Không đến' : 'No-show'}</span>
          </span>
        );
    }
  };

  // Render a single Booking Card
  const renderBookingCard = (bk: Booking) => {
    const srv: ServiceEntity = resolveServiceBySlugOrName(bk.serviceSlug || bk.service);
    const ServiceIcon = SERVICE_ICONS[srv.icon];
    const tabCat = getBookingTabCategory(bk);
    const countdown = tabCat === 'upcoming' ? getUpcomingCountdownText(bk, lang) : null;
    const modCheck = canModifyBooking(bk);
    const isWithin24h = tabCat === 'upcoming' && !modCheck.allowed && modCheck.reason === 'within_24h';
    const within24hNotice = isVi
      ? 'Vui lòng gọi 0337 203 332 để đổi hoặc hủy lịch trong vòng 24 giờ.'
      : 'Please call 0337 203 332 to reschedule or cancel within 24 hours.';

    const petProfileEval = evaluateAddBookingToPetProfile(bk, pets);
    const alreadyAddedToPet = isBookingAddedToPetRecord(bk);
    const codeStr = bk.code || bk.id;

    return (
      <article
        key={bk.id}
        data-testid={`booking-card-${codeStr}`}
        className="rounded-[20px] border p-[20px] transition-all"
        style={{
          backgroundColor: 'var(--surface)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow)',
        }}
      >
        {/* Top Row: Clickable Card Header + Copy Button */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <button
            type="button"
            data-testid={`booking-card-header-${codeStr}`}
            onClick={(e) => handleOpenDetail(bk, e.currentTarget)}
            className="flex-1 min-w-0 text-left flex items-start gap-4 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-xl"
          >
            {/* Left: 56px round tile with service icon (--surface-2 background, --primary icon) */}
            <div
              className="w-[56px] h-[56px] rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
              style={{
                backgroundColor: 'var(--surface-2)',
                color: 'var(--primary)',
              }}
            >
              <ServiceIcon className="w-6 h-6" />
            </div>

            {/* Main details */}
            <div className="min-w-0 flex-1 space-y-1">
              <h3
                className="font-heading text-[20px] font-bold leading-snug break-words group-hover:underline"
                style={{ color: 'var(--primary)' }}
              >
                {srv.name[lang]}
              </h3>

              <p className="text-sm font-bold break-words" style={{ color: 'var(--text)' }}>
                {isVi
                  ? `Bé ${bk.petName || 'Cưng'} · ${getPetTypeLabel(bk.petType, lang)}`
                  : `${bk.petName || 'Pet'} · ${getPetTypeLabel(bk.petType, lang)}`}
              </p>

              <div
                className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold pt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="inline-flex items-center gap-1.5 tabular-nums">
                  <Calendar className="w-4 h-4 shrink-0" style={{ color: 'var(--primary)' }} />
                  <span>{formatBookingDateWithWeekday(bk.date, bk.timeSlot, lang)}</span>
                </span>
              </div>

              {/* Masked owner contact line in card list */}
              <div
                data-testid={`booking-masked-contact-${codeStr}`}
                className="text-xs font-semibold flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-0.5"
                style={{ color: 'var(--text-muted)' }}
              >
                <span className="tabular-nums">{maskBookingPhone(bk.phone)}</span>
                {bk.email && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{maskBookingEmail(bk.email)}</span>
                  </>
                )}
              </div>
            </div>
          </button>

          {/* Right: Status pill & Countdown chip */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0">
            {renderStatusPill(bk.status)}
            {countdown && (
              <span
                data-testid={`booking-countdown-${codeStr}`}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border"
                style={{
                  backgroundColor: 'var(--bg)',
                  color: 'var(--primary)',
                  borderColor: 'var(--border)',
                }}
              >
                <Clock className="w-3 h-3 shrink-0" />
                <span>{countdown}</span>
              </span>
            )}
          </div>
        </div>

        {/* Booking Code Row with Copy Button */}
        <div
          className="mt-3 pt-3 border-t flex flex-wrap items-center justify-between gap-2"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[14px] font-bold tabular-nums"
              style={{ color: 'var(--text-muted)' }}
            >
              {isVi ? 'Mã đặt lịch:' : 'Booking code:'}{' '}
              <strong style={{ color: 'var(--text)' }}>{codeStr}</strong>
            </span>
            <button
              type="button"
              data-testid={`copy-code-btn-${codeStr}`}
              onClick={(e) => handleCopyCode(codeStr, e)}
              aria-label={
                isVi ? `Sao chép mã đặt lịch ${codeStr}` : `Copy booking code ${codeStr}`
              }
              className="min-h-[44px] min-w-[44px] sm:min-h-[34px] sm:min-w-[34px] px-2.5 py-1 rounded-full border text-xs font-bold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              style={{
                backgroundColor: 'var(--bg)',
                borderColor: 'var(--border)',
                color: 'var(--primary)',
              }}
            >
              {copiedCode === codeStr ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Đã chép' : 'Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isVi ? 'Sao chép' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>

          <span className="text-xs font-bold" style={{ color: 'var(--primary)' }}>
            {formatEstimatedPriceText(srv, bk.weightRange, lang)}
          </span>
        </div>

        {/* Actions Row (secondary buttons, height 40px / min-h 44px on mobile) */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          {tabCat === 'upcoming' && (
            <>
              <button
                type="button"
                data-testid={`view-detail-btn-${codeStr}`}
                onClick={(e) => handleOpenDetail(bk, e.currentTarget)}
                className="btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              >
                <span>{isVi ? 'Xem chi tiết' : 'View details'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                data-testid={`reschedule-btn-${codeStr}`}
                disabled={!modCheck.allowed}
                title={isWithin24h ? within24hNotice : undefined}
                onClick={(e) => openRescheduleDialog(bk, e.currentTarget)}
                className={`btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] ${
                  !modCheck.allowed
                    ? 'opacity-45 !cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đổi giờ' : 'Reschedule'}</span>
              </button>

              <button
                type="button"
                data-testid={`cancel-btn-${codeStr}`}
                disabled={!modCheck.allowed}
                title={isWithin24h ? within24hNotice : undefined}
                onClick={(e) => openCancelDialog(bk, e.currentTarget)}
                className={`btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] ${
                  !modCheck.allowed
                    ? 'opacity-45 !cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>{isVi ? 'Hủy lịch' : 'Cancel'}</span>
              </button>

              <button
                type="button"
                data-testid={`ics-btn-${codeStr}`}
                onClick={(e) => handleDownloadIcs(bk, e)}
                className="btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isVi ? 'Thêm vào lịch' : 'Add to calendar'}</span>
              </button>
            </>
          )}

          {tabCat === 'past' && (
            <>
              <button
                type="button"
                data-testid={`rebook-btn-${codeStr}`}
                onClick={(e) => handleRebook(bk, e)}
                className="btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đặt lại' : 'Book again'}</span>
              </button>

              <button
                type="button"
                data-testid={`view-detail-btn-${codeStr}`}
                onClick={(e) => handleOpenDetail(bk, e.currentTarget)}
                className="btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              >
                <span>{isVi ? 'Xem chi tiết' : 'View details'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Link with Pet profile for completed vaccination / deworming / checkup bookings */}
              {petProfileEval.eligible && (
                alreadyAddedToPet ? (
                  <div className="inline-flex items-center gap-2 flex-wrap">
                    <span
                      data-testid={`added-pet-record-badge-${codeStr}`}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 border"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        color: 'var(--primary)',
                        borderColor: 'var(--border)',
                      }}
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>{isVi ? 'Đã thêm vào hồ sơ' : 'Added to record'}</span>
                    </span>
                    <button
                      type="button"
                      data-testid={`open-pet-profile-link-${codeStr}`}
                      onClick={() => onNavigate('pet-profiles')}
                      className="min-h-[40px] px-3 py-1.5 text-xs font-extrabold underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi
                        ? `Xem hồ sơ bé ${petProfileEval.matchedPet?.name}`
                        : `View ${petProfileEval.matchedPet?.name}'s profile`}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    data-testid={`add-to-pet-record-btn-${codeStr}`}
                    onClick={(e) => handleAddBookingToPetProfile(bk, e)}
                    className="btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>
                      {isVi ? 'Thêm vào hồ sơ của bé' : "Add to pet's record"}
                    </span>
                  </button>
                )
              )}
            </>
          )}

          {tabCat === 'cancelled' && (
            <>
              <button
                type="button"
                data-testid={`rebook-btn-${codeStr}`}
                onClick={(e) => handleRebook(bk, e)}
                className="btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isVi ? 'Đặt lại' : 'Book again'}</span>
              </button>

              <button
                type="button"
                data-testid={`view-detail-btn-${codeStr}`}
                onClick={(e) => handleOpenDetail(bk, e.currentTarget)}
                className="btn-secondary min-h-[44px] sm:min-h-[40px] px-4 py-1.5 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              >
                <span>{isVi ? 'Xem chi tiết' : 'View details'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Within 24h helper notice */}
        {isWithin24h && (
          <p
            data-testid={`within-24h-notice-${codeStr}`}
            className="mt-3 text-xs font-semibold flex items-center gap-1.5"
            style={{ color: 'var(--text-muted)' }}
          >
            <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--coral)' }} />
            <span>{within24hNotice}</span>
          </p>
        )}
      </article>
    );
  };

  // Render Detail Content (used in both Desktop Right Drawer and Mobile Full Page /lich-hen/{code})
  const renderDetailContent = (bk: Booking) => {
    const srv = resolveServiceBySlugOrName(bk.serviceSlug || bk.service);
    const ServiceIcon = SERVICE_ICONS[srv.icon];
    const codeStr = bk.code || bk.id;
    const isVerifiedOwner = isBookingVerifiedForViewer(bk);
    const modCheck = canModifyBooking(bk);
    const tabCat = getBookingTabCategory(bk);
    const isWithin24h = tabCat === 'upcoming' && !modCheck.allowed && modCheck.reason === 'within_24h';
    const petProfileEval = evaluateAddBookingToPetProfile(bk, pets);
    const alreadyAddedToPet = isBookingAddedToPetRecord(bk);

    const createdDateStr = formatIsoDateForDisplay(
      (bk.createdAt || '').slice(0, 10) || bk.date,
      lang
    );
    const confirmedDateStr = bk.confirmedAt
      ? formatIsoDateForDisplay(bk.confirmedAt.slice(0, 10), lang)
      : bk.status === 'Đã xác nhận' || bk.status === 'Hoàn thành'
      ? createdDateStr
      : null;
    const completedDateStr = bk.completedAt
      ? formatIsoDateForDisplay(bk.completedAt.slice(0, 10), lang)
      : bk.status === 'Hoàn thành'
      ? formatIsoDateForDisplay(bk.date, lang)
      : null;

    return (
      <div className="space-y-6">
        {/* Header with Service & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
              style={{
                backgroundColor: 'var(--surface-2)',
                color: 'var(--primary)',
              }}
            >
              <ServiceIcon className="w-6 h-6" />
            </div>
            <div>
              <h2
                className="font-heading text-2xl font-extrabold leading-tight"
                style={{ color: 'var(--primary)' }}
              >
                {srv.name[lang]}
              </h2>
              <p className="text-sm font-bold" style={{ color: 'var(--text-muted)' }}>
                {srv.duration[lang]} · {formatEstimatedPriceText(srv, bk.weightRange, lang)}
              </p>
            </div>
          </div>
          {renderStatusPill(bk.status)}
        </div>

        {/* Booking Code Box with Copy */}
        <div
          className="rounded-2xl border p-4 flex items-center justify-between gap-3"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
          }}
        >
          <div>
            <span
              className="block text-[11px] font-bold uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              {isVi ? 'Mã đặt lịch' : 'Booking code'}
            </span>
            <span
              data-testid="detail-booking-code"
              className="font-heading text-xl font-extrabold tabular-nums"
              style={{ color: 'var(--primary)' }}
            >
              {codeStr}
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => handleCopyCode(codeStr, e)}
            className="min-h-[44px] px-4 py-2 rounded-full border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--primary)',
            }}
          >
            {copiedCode === codeStr ? (
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

        {/* Status Timeline: Đã gửi -> Đã xác nhận -> Hoàn thành */}
        <div
          data-testid="detail-status-timeline"
          className="rounded-2xl border p-4 space-y-3"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
          }}
        >
          <h3 className="text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
            {isVi ? 'Tiến trình lịch hẹn' : 'Appointment timeline'}
          </h3>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                key: 'sent',
                labelVi: 'Đã gửi',
                labelEn: 'Submitted',
                date: createdDateStr,
                done: true,
              },
              {
                key: 'confirmed',
                labelVi: 'Đã xác nhận',
                labelEn: 'Confirmed',
                date: confirmedDateStr,
                done:
                  bk.status === 'Đã xác nhận' ||
                  bk.status === 'Hoàn thành' ||
                  Boolean(bk.confirmedAt),
              },
              {
                key: 'completed',
                labelVi:
                  bk.status === 'Đã hủy'
                    ? 'Đã hủy'
                    : bk.status === 'Không đến'
                    ? 'Không đến'
                    : 'Hoàn thành',
                labelEn:
                  bk.status === 'Đã hủy'
                    ? 'Cancelled'
                    : bk.status === 'Không đến'
                    ? 'No-show'
                    : 'Completed',
                date:
                  bk.status === 'Đã hủy' && bk.cancelledAt
                    ? formatIsoDateForDisplay(bk.cancelledAt.slice(0, 10), lang)
                    : completedDateStr,
                done:
                  bk.status === 'Hoàn thành' ||
                  bk.status === 'Đã hủy' ||
                  bk.status === 'Không đến',
              },
            ].map((step) => (
              <li
                key={step.key}
                className="flex items-center gap-2.5 p-2.5 rounded-xl border"
                style={{
                  backgroundColor: step.done ? 'var(--surface)' : 'transparent',
                  borderColor: step.done ? 'var(--primary)' : 'var(--border)',
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    backgroundColor: step.done ? 'var(--primary)' : 'var(--surface-2)',
                    color: step.done ? 'var(--on-primary)' : 'var(--text-muted)',
                  }}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold" style={{ color: 'var(--text)' }}>
                    {isVi ? step.labelVi : step.labelEn}
                  </span>
                  <span className="block text-[11px] tabular-nums" style={{ color: 'var(--text-muted)' }}>
                    {step.date || (isVi ? 'Đang chờ' : 'Pending')}
                  </span>
                </div>
              </li>
            ))}
          </ol>

          {bk.status === 'Đã hủy' && bk.cancelReason && (
            <p className="text-xs font-semibold pt-1" style={{ color: 'var(--text-muted)' }}>
              {isVi ? 'Lý do hủy:' : 'Cancellation reason:'} <strong>{bk.cancelReason}</strong>
            </p>
          )}
        </div>

        {/* Details Grid */}
        <div
          className="rounded-2xl border p-5 space-y-4 text-sm"
          style={{
            backgroundColor: 'var(--bg)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                {isVi ? 'Thông tin của bé' : 'Pet details'}
              </span>
              <span className="font-bold text-base" style={{ color: 'var(--text)' }}>
                {bk.petName ? `Bé ${bk.petName}` : getPetTypeLabel(bk.petType, lang)} ·{' '}
                {getPetTypeLabel(bk.petType, lang)}
                {bk.weightRange ? ` (${getWeightRangeLabel(bk.weightRange, lang)})` : ''}
              </span>
              {bk.petBreed && (
                <span className="block text-xs font-semibold mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {bk.petBreed}
                </span>
              )}
            </div>

            <div>
              <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                {isVi ? 'Ngày & giờ hẹn' : 'Date & time'}
              </span>
              <span className="font-bold text-base tabular-nums" style={{ color: 'var(--text)' }}>
                {formatBookingDateWithWeekday(bk.date, bk.timeSlot, lang)}
              </span>
              {bk.rescheduledFrom && bk.rescheduledFrom.length > 0 && (
                <span className="block text-xs font-semibold mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  {isVi ? 'Đã đổi từ:' : 'Rescheduled from:'}{' '}
                  {formatIsoDateForDisplay(
                    bk.rescheduledFrom[bk.rescheduledFrom.length - 1].fromDate,
                    lang
                  )}{' '}
                  · {bk.rescheduledFrom[bk.rescheduledFrom.length - 1].fromTimeSlot || '09:00'}
                </span>
              )}
            </div>

            <div>
              <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                {isVi ? 'Thông tin liên hệ' : 'Contact details'}
              </span>
              <span
                data-testid="detail-owner-phone"
                className="font-bold text-base block tabular-nums"
                style={{ color: 'var(--text)' }}
              >
                {bk.fullName} ·{' '}
                {isVerifiedOwner ? formatBookingPhoneOnBlur(bk.phone) : maskBookingPhone(bk.phone)}
              </span>
              {bk.email && (
                <span
                  data-testid="detail-owner-email"
                  className="text-xs font-semibold block mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {isVerifiedOwner ? bk.email : maskBookingEmail(bk.email)}
                </span>
              )}
            </div>

            <div>
              <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                {isVi ? 'Chi phí dự kiến' : 'Estimated price'}
              </span>
              <span className="font-extrabold text-base" style={{ color: 'var(--primary)' }}>
                {formatEstimatedPriceText(srv, bk.weightRange, lang)}
              </span>
            </div>
          </div>

          {bk.note && (
            <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
              <span className="block text-xs font-bold mb-1" style={{ color: 'var(--text-muted)' }}>
                {isVi ? 'Ghi chú của khách hàng' : 'Customer note'}
              </span>
              <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                {bk.note}
              </p>
            </div>
          )}
        </div>

        {/* Actions inside Detail View */}
        <div className="flex flex-wrap items-center gap-2.5">
          {tabCat === 'upcoming' && (
            <>
              <button
                type="button"
                disabled={!modCheck.allowed}
                onClick={(e) => openRescheduleDialog(bk, e.currentTarget)}
                className={`btn-secondary min-h-[44px] px-4 py-2 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 ${
                  !modCheck.allowed ? 'opacity-45 !cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>{isVi ? 'Đổi giờ' : 'Reschedule'}</span>
              </button>

              <button
                type="button"
                disabled={!modCheck.allowed}
                onClick={(e) => openCancelDialog(bk, e.currentTarget)}
                className={`btn-secondary min-h-[44px] px-4 py-2 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 ${
                  !modCheck.allowed ? 'opacity-45 !cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <XCircle className="w-4 h-4" />
                <span>{isVi ? 'Hủy lịch' : 'Cancel'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => handleDownloadIcs(bk, e)}
                className="btn-secondary min-h-[44px] px-4 py-2 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isVi ? 'Thêm vào lịch' : 'Add to calendar'}</span>
              </button>
            </>
          )}

          {tabCat !== 'upcoming' && (
            <button
              type="button"
              onClick={(e) => handleRebook(bk, e)}
              className="btn-primary min-h-[44px] px-5 py-2 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{isVi ? 'Đặt lại dịch vụ này' : 'Book this service again'}</span>
            </button>
          )}

          {petProfileEval.eligible && !alreadyAddedToPet && (
            <button
              type="button"
              onClick={(e) => handleAddBookingToPetProfile(bk, e)}
              className="btn-secondary min-h-[44px] px-4 py-2 text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isVi ? 'Thêm vào hồ sơ của bé' : "Add to pet's record"}</span>
            </button>
          )}
        </div>

        {isWithin24h && (
          <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
            {isVi
              ? 'Vui lòng gọi 0337 203 332 để đổi hoặc hủy lịch trong vòng 24 giờ.'
              : 'Please call 0337 203 332 to reschedule or cancel within 24 hours.'}
          </p>
        )}

        {/* Cancellation Policy Line */}
        <p
          data-testid="detail-cancellation-policy"
          className="text-xs font-semibold pt-2 border-t"
          style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
        >
          {isVi
            ? 'Bạn có thể đổi hoặc hủy lịch miễn phí trước 24 giờ.'
            : 'You can reschedule or cancel for free up to 24 hours in advance.'}
        </p>

        {/* Help Box */}
        <div
          className="rounded-2xl border p-4 space-y-2"
          style={{
            backgroundColor: 'var(--surface-2)',
            borderColor: 'var(--border)',
          }}
        >
          <span className="block text-xs font-extrabold uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
            {isVi ? 'Cần hỗ trợ?' : 'Need help?'}
          </span>
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold">
            <a
              href={CONTACT_INFO.phoneHref}
              className="inline-flex items-center gap-1.5 hover:underline"
              style={{ color: 'var(--primary)' }}
            >
              <Phone className="w-4 h-4 shrink-0" style={{ color: 'var(--coral)' }} />
              <span>{isVi ? 'Gọi 0337 203 332' : 'Call 0337 203 332'}</span>
            </a>
            <a
              href={CONTACT_INFO.mailtoHref}
              className="inline-flex items-center gap-1.5 hover:underline break-all"
              style={{ color: 'var(--primary)' }}
            >
              <Mail className="w-4 h-4 shrink-0" style={{ color: 'var(--coral)' }} />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>
    );
  };

  // =========================================================================
  // MOBILE FULL-PAGE DETAIL VIEW (/lich-hen/{code} on < 768px)
  // =========================================================================
  if (isMobileViewport && activeDetailBooking) {
    return (
      <div
        data-testid="page-booking-detail-mobile"
        className="min-h-screen pt-24 pb-20 shared-container"
      >
        <div role="status" aria-live="polite" className="sr-only">
          {liveAnnouncement}
        </div>

        <button
          type="button"
          data-testid="mobile-detail-back-btn"
          onClick={handleCloseDetail}
          className="min-h-[44px] px-4 py-2 mb-5 rounded-full border text-sm font-bold inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            color: 'var(--primary)',
          }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isVi ? 'Quay lại Lịch hẹn của tôi' : 'Back to My bookings'}</span>
        </button>

        <div
          className="rounded-[24px] border p-5"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          {renderDetailContent(activeDetailBooking)}
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="page-my-bookings"
      className="min-h-screen pt-24 sm:pt-28 pb-24 shared-container"
    >
      {/* Screen-reader live region for cancel / reschedule announcements */}
      <div
        data-testid="booking-aria-live"
        role="status"
        aria-live="polite"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* Page Header with Primary Button "Đặt lịch mới" on the right */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2.5 max-w-2xl">
          <span
            data-testid="my-bookings-eyebrow"
            className="block uppercase font-bold"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--primary)',
            }}
          >
            {isVi ? 'LỊCH HẸN' : 'APPOINTMENTS'}
          </span>
          <h1
            data-testid="my-bookings-title"
            className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: 'var(--primary)',
            }}
          >
            {isVi ? 'Lịch hẹn của tôi' : 'My bookings'}
          </h1>
          <p
            data-testid="my-bookings-subtitle"
            className="text-[18px] leading-relaxed font-normal"
            style={{ color: 'var(--text-muted)' }}
          >
            {isVi
              ? 'Xem, đổi giờ hoặc hủy lịch hẹn chăm sóc của bé.'
              : "View, reschedule or cancel your pet's appointments."}
          </p>
        </div>

        <button
          type="button"
          data-testid="new-booking-header-btn"
          onClick={() => onNavigateUrl('/dat-lich')}
          className="btn-primary min-h-[48px] px-6 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
        >
          <Calendar className="w-4 h-4" />
          <span>{isVi ? 'Đặt lịch mới' : 'New booking'}</span>
        </button>
      </header>

      {/* =================================================================== */}
      {/* LOADING & ERROR STATES                                              */}
      {/* =================================================================== */}
      {loadState === 'loading' && (
        <div
          data-testid="bookings-loading-skeleton"
          className="max-w-[860px] mx-auto space-y-4"
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-[20px] border p-5 animate-pulse space-y-3"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full"
                  style={{ backgroundColor: 'var(--surface-2)' }}
                />
                <div className="flex-1 space-y-2">
                  <div
                    className="h-5 w-48 rounded"
                    style={{ backgroundColor: 'var(--surface-2)' }}
                  />
                  <div
                    className="h-4 w-64 rounded"
                    style={{ backgroundColor: 'var(--surface-2)' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loadState === 'error' && (
        <div
          data-testid="bookings-error-state"
          className="max-w-[860px] mx-auto rounded-[20px] border p-8 text-center space-y-4"
          style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)',
          }}
        >
          <AlertCircle className="w-10 h-10 mx-auto" style={{ color: 'var(--coral)' }} />
          <p className="font-heading text-xl font-bold" style={{ color: 'var(--primary)' }}>
            {isVi ? 'Không tải được lịch hẹn' : 'Could not load appointments'}
          </p>
          <button
            type="button"
            onClick={() => setLoadState('ready')}
            className="btn-primary min-h-[44px] px-6 py-2.5 text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{isVi ? 'Thử lại' : 'Retry'}</span>
          </button>
        </div>
      )}

      {/* =================================================================== */}
      {/* VISITOR WITHOUT LOGIN: LOOKUP CARD + PRIVACY PROTECTION             */}
      {/* =================================================================== */}
      {loadState === 'ready' && !currentUser && (
        <div className="max-w-[860px] mx-auto space-y-8">
          <div
            data-testid="visitor-lookup-card"
            className="rounded-[24px] border p-6 sm:p-8 space-y-6"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="space-y-1.5">
              <h2
                className="font-heading text-2xl sm:text-3xl font-extrabold"
                style={{ color: 'var(--primary)' }}
              >
                {isVi ? 'Tra cứu lịch hẹn' : 'Look up a booking'}
              </h2>
              <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                {isVi
                  ? 'Nhập mã đặt lịch và số điện thoại đã đăng ký để xem chi tiết, đổi giờ hoặc hủy lịch hẹn.'
                  : 'Enter your booking code and registered phone number to view details, reschedule, or cancel.'}
              </p>
            </div>

            {openDetailCode && !verifiedVisitorBooking && (
              <div
                data-testid="unverified-url-notice"
                role="alert"
                className="p-3.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2.5"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                  color: 'var(--primary)',
                }}
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  {isVi
                    ? `Vì lý do bảo mật, vui lòng nhập số điện thoại của mã ${openDetailCode} để xác thực chủ sở hữu.`
                    : `For privacy protection, please enter the phone number for ${openDetailCode} to verify ownership.`}
                </span>
              </div>
            )}

            <form onSubmit={handleLookupSubmit} noValidate className="space-y-5">
              {/* Honeypot field */}
              <input
                ref={lookupHoneypotRef}
                type="text"
                name="animora_lookup_hp"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mã đặt lịch* */}
                <div>
                  <label
                    htmlFor="lookup-booking-code"
                    className="block text-sm font-bold mb-1.5"
                    style={{ color: 'var(--text)' }}
                  >
                    {isVi ? 'Mã đặt lịch *' : 'Booking code *'}
                  </label>
                  <input
                    id="lookup-booking-code"
                    data-testid="lookup-code-input"
                    type="text"
                    value={lookupCode}
                    onChange={(e) => setLookupCode(e.target.value)}
                    onBlur={() => setLookupCodeTouched(true)}
                    placeholder="DL-2026-0001"
                    className="form-input w-full font-bold uppercase tracking-wider"
                  />
                  {lookupCodeTouched && !lookupCode.trim() && (
                    <p
                      role="alert"
                      aria-live="polite"
                      className="mt-1.5 text-xs font-bold flex items-center gap-1"
                      style={{ color: darkMode ? '#FDA29B' : '#B42318' }}
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {isVi ? 'Vui lòng nhập mã đặt lịch' : 'Please enter booking code'}
                      </span>
                    </p>
                  )}
                </div>

                {/* Số điện thoại* (same phone logic as booking form) */}
                <div>
                  <label
                    htmlFor="lookup-booking-phone"
                    className="block text-sm font-bold mb-1.5"
                    style={{ color: 'var(--text)' }}
                  >
                    {isVi ? 'Số điện thoại *' : 'Phone number *'}
                  </label>
                  <input
                    id="lookup-booking-phone"
                    data-testid="lookup-phone-input"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={
                      isLookupPhoneFocused
                        ? lookupPhoneDigits
                        : formatBookingPhoneOnBlur(lookupPhoneDigits)
                    }
                    onChange={(e) => {
                      setLookupPhoneDigits(cleanBookingPhoneDigits(e.target.value));
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData('text');
                      setLookupPhoneDigits(cleanBookingPhoneDigits(pasted));
                    }}
                    onFocus={() => setIsLookupPhoneFocused(true)}
                    onBlur={() => {
                      setIsLookupPhoneFocused(false);
                      setLookupPhoneTouched(true);
                    }}
                    placeholder="0337 203 332"
                    className="form-input w-full font-bold tabular-nums"
                  />
                  {lookupPhoneTouched &&
                    validateBookingPhoneDigits(lookupPhoneDigits, lang) && (
                      <p
                        role="alert"
                        aria-live="polite"
                        className="mt-1.5 text-xs font-bold flex items-center gap-1"
                        style={{ color: darkMode ? '#FDA29B' : '#B42318' }}
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>
                          {validateBookingPhoneDigits(lookupPhoneDigits, lang)}
                        </span>
                      </p>
                    )}
                </div>
              </div>

              {lookupError && (
                <div
                  data-testid="lookup-error-alert"
                  role="alert"
                  aria-live="assertive"
                  className="p-3.5 rounded-xl border text-sm font-bold flex items-center gap-2"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: darkMode ? '#FDA29B' : '#B42318',
                    color: darkMode ? '#FDA29B' : '#B42318',
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{lookupError}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <button
                  type="submit"
                  data-testid="lookup-submit-btn"
                  className="btn-primary min-h-[48px] px-7 py-3 text-sm font-bold inline-flex items-center justify-center gap-2 shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                >
                  <Search className="w-4 h-4" />
                  <span>{isVi ? 'Tra cứu lịch hẹn' : 'Look up booking'}</span>
                </button>

                <button
                  type="button"
                  data-testid="lookup-login-link-btn"
                  onClick={() => onNavigate('login')}
                  className="min-h-[44px] px-4 py-2 text-sm font-extrabold inline-flex items-center justify-center gap-2 underline cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-lg"
                  style={{ color: 'var(--primary)' }}
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {isVi
                      ? 'Đăng nhập để xem tất cả lịch hẹn'
                      : 'Log in to see all your bookings'}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Single verified booking returned by lookup */}
          {verifiedVisitorBooking && (
            <div data-testid="visitor-lookup-result" className="space-y-4">
              <h3
                className="font-heading text-xl font-bold"
                style={{ color: 'var(--primary)' }}
              >
                {isVi ? 'Kết quả tra cứu' : 'Lookup result'}
              </h3>
              {renderBookingCard(verifiedVisitorBooking)}
            </div>
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* LOGGED-IN USER: TABS, FILTERS, AND BOOKING CARDS LIST               */}
      {/* =================================================================== */}
      {loadState === 'ready' && currentUser && (
        <div className="space-y-6">
          {/* Tabs (pills) + Pet & Sort Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Role tablist with arrow-key navigation */}
            <div
              role="tablist"
              aria-label={isVi ? 'Phân loại lịch hẹn' : 'Appointment status tabs'}
              className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-full border self-start"
              style={{
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)',
              }}
            >
              {(
                [
                  {
                    id: 'upcoming' as const,
                    labelVi: 'Sắp tới',
                    labelEn: 'Upcoming',
                    badge: upcomingCount,
                  },
                  {
                    id: 'past' as const,
                    labelVi: 'Đã qua',
                    labelEn: 'Past',
                  },
                  {
                    id: 'cancelled' as const,
                    labelVi: 'Đã hủy',
                    labelEn: 'Cancelled',
                  },
                ]
              ).map((t) => {
                const isSelected = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    ref={(el) => {
                      tabRefs.current[t.id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`booking-tab-${t.id}`}
                    aria-selected={isSelected}
                    aria-controls={`booking-tabpanel-${t.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    data-testid={`booking-tab-${t.id}`}
                    onClick={() => setActiveTab(t.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, t.id)}
                    className="min-h-[44px] px-5 py-2 rounded-full text-sm font-extrabold inline-flex items-center gap-2 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: isSelected ? 'var(--primary)' : 'transparent',
                      color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                    }}
                  >
                    <span>{isVi ? t.labelVi : t.labelEn}</span>
                    {typeof t.badge === 'number' && (
                      <span
                        data-testid="upcoming-tab-badge"
                        className="px-2 py-0.5 rounded-full text-xs font-extrabold tabular-nums"
                        style={{
                          backgroundColor: isSelected
                            ? 'var(--on-primary)'
                            : 'var(--surface-2)',
                          color: isSelected ? 'var(--primary)' : 'var(--primary)',
                        }}
                      >
                        {t.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Filters on the right of the tabs (hidden when there is only one booking) */}
            {userBookings.length > 1 && (
              <div
                data-testid="booking-filters-bar"
                className="flex flex-wrap items-center gap-3"
              >
                {/* Pet Selector */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="booking-pet-filter"
                    className="text-xs font-bold whitespace-nowrap"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {isVi ? 'Bé cưng:' : 'Pet:'}
                  </label>
                  <select
                    id="booking-pet-filter"
                    data-testid="booking-pet-filter-select"
                    value={selectedPetFilter}
                    onChange={(e) => setSelectedPetFilter(e.target.value)}
                    className="min-h-[44px] px-4 py-2 rounded-full border text-xs sm:text-sm font-bold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                  >
                    <option value="all">
                      {isVi ? 'Tất cả các bé' : 'All pets'}
                    </option>
                    {userBookingPetNames.map((petName) => (
                      <option key={petName} value={petName}>
                        {isVi ? `Bé ${petName}` : petName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Control (Gần nhất / Xa nhất) */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="booking-sort-select"
                    className="text-xs font-bold whitespace-nowrap"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {isVi ? 'Sắp xếp:' : 'Sort:'}
                  </label>
                  <select
                    id="booking-sort-select"
                    data-testid="booking-sort-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as BookingSortOrder)}
                    className="min-h-[44px] px-4 py-2 rounded-full border text-xs sm:text-sm font-bold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border)',
                      color: 'var(--text)',
                    }}
                  >
                    <option value="nearest">
                      {isVi ? 'Gần nhất' : 'Nearest'}
                    </option>
                    <option value="farthest">
                      {isVi ? 'Xa nhất' : 'Farthest'}
                    </option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Tab Panel: One column of booking cards (max-width 860px, centered on desktop; full width on mobile) */}
          <div
            role="tabpanel"
            id={`booking-tabpanel-${activeTab}`}
            aria-labelledby={`booking-tab-${activeTab}`}
            className="max-w-[860px] mx-auto space-y-4"
          >
            {displayedBookings.length > 0 ? (
              displayedBookings.map((bk) => renderBookingCard(bk))
            ) : (
              <div
                data-testid={`empty-state-${activeTab}`}
                className="rounded-[20px] border p-10 text-center space-y-4"
                style={{
                  backgroundColor: 'var(--surface)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    color: 'var(--primary)',
                  }}
                >
                  <PawPrint className="w-8 h-8" />
                </div>

                {activeTab === 'upcoming' && (
                  <>
                    <h3
                      className="font-heading text-2xl font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi
                        ? 'Bạn chưa có lịch hẹn nào sắp tới'
                        : 'You have no upcoming appointments'}
                    </h3>
                    <p
                      className="text-sm max-w-md mx-auto"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {isVi
                        ? 'Đặt lịch khám tổng quát, spa thảo dược hoặc lưu trú để các bác sĩ Animora chăm sóc chu đáo cho bé.'
                        : 'Book a vet checkup, herbal spa, or boarding session for your beloved pet.'}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        data-testid="empty-upcoming-book-now-btn"
                        onClick={() => onNavigateUrl('/dat-lich')}
                        className="btn-primary min-h-[48px] px-7 py-3 text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{isVi ? 'Đặt lịch ngay' : 'Book now'}</span>
                      </button>
                    </div>
                  </>
                )}

                {activeTab === 'past' && (
                  <>
                    <h3
                      className="font-heading text-2xl font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi
                        ? 'Chưa có lịch hẹn nào đã qua'
                        : 'No past appointments yet'}
                    </h3>
                    <p
                      className="text-sm max-w-md mx-auto"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {isVi
                        ? 'Các lịch hẹn đã hoàn thành của bé sẽ được lưu trữ tại đây để ba mẹ tiện theo dõi.'
                        : "Your pet's completed visits will appear here for easy tracking."}
                    </p>
                  </>
                )}

                {activeTab === 'cancelled' && (
                  <>
                    <h3
                      className="font-heading text-2xl font-bold"
                      style={{ color: 'var(--primary)' }}
                    >
                      {isVi
                        ? 'Không có lịch hẹn nào đã hủy'
                        : 'No cancelled appointments'}
                    </h3>
                    <p
                      className="text-sm max-w-md mx-auto"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {isVi
                        ? 'Tuyệt vời! Bạn chưa hủy lịch hẹn chăm sóc nào gần đây.'
                        : 'Great! You have not cancelled any recent appointments.'}
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* DESKTOP RIGHT DRAWER FOR DETAIL VIEW (>= 768px)                     */}
      {/* =================================================================== */}
      {!isMobileViewport && activeDetailBooking && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs"
          onClick={handleCloseDetail}
        >
          <div
            ref={detailDrawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={isVi ? 'Chi tiết lịch hẹn' : 'Booking details'}
            data-testid="booking-detail-drawer"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl h-full overflow-y-auto p-6 sm:p-8 border-l shadow-2xl flex flex-col justify-between"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
          >
            <div>
              <div
                className="flex items-center justify-between pb-4 mb-6 border-b"
                style={{ borderColor: 'var(--border)' }}
              >
                <span
                  className="font-heading text-xl font-extrabold"
                  style={{ color: 'var(--primary)' }}
                >
                  {isVi ? 'Chi tiết lịch hẹn' : 'Booking details'}
                </span>
                <button
                  type="button"
                  data-testid="close-detail-drawer-btn"
                  onClick={handleCloseDetail}
                  aria-label={isVi ? 'Đóng chi tiết lịch hẹn' : 'Close booking details'}
                  className="min-h-[44px] min-w-[44px] rounded-full border flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                  style={{
                    backgroundColor: 'var(--bg)',
                    borderColor: 'var(--border)',
                    color: 'var(--text)',
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderDetailContent(activeDetailBooking)}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CANCEL CONFIRMATION DIALOG                                          */}
      {/* =================================================================== */}
      {cancellingBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={closeCancelDialog}
        >
          <div
            ref={cancelDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-dialog-title"
            data-testid="cancel-booking-dialog"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[24px] border p-6 sm:p-7 space-y-5"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h2
                id="cancel-dialog-title"
                className="font-heading text-2xl font-extrabold leading-snug"
                style={{ color: 'var(--primary)' }}
              >
                {isVi
                  ? 'Bạn chắc chắn muốn hủy lịch này?'
                  : 'Are you sure you want to cancel this appointment?'}
              </h2>
              <button
                type="button"
                onClick={closeCancelDialog}
                aria-label={isVi ? 'Đóng hộp thoại hủy lịch' : 'Close cancel dialog'}
                className="min-h-[44px] min-w-[44px] rounded-full border flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
              {isVi
                ? `Mã lịch hẹn ${cancellingBooking.code || cancellingBooking.id} · Bé ${
                    cancellingBooking.petName || ''
                  } (${formatIsoDateForDisplay(cancellingBooking.date, lang)} · ${
                    cancellingBooking.timeSlot || '09:00'
                  })`
                : `Booking ${cancellingBooking.code || cancellingBooking.id} · ${
                    cancellingBooking.petName || ''
                  } (${formatIsoDateForDisplay(cancellingBooking.date, lang)} · ${
                    cancellingBooking.timeSlot || '09:00'
                  })`}
            </p>

            {/* Optional Reason Pills */}
            <div className="space-y-2">
              <span className="block text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                {isVi ? 'Lý do hủy (tùy chọn):' : 'Reason for cancelling (optional):'}
              </span>
              <div className="flex flex-wrap gap-2">
                {CANCEL_REASON_OPTIONS.map((opt) => {
                  const label = isVi ? opt.labelVi : opt.labelEn;
                  const isActive = selectedCancelReason === label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      data-testid={`cancel-reason-pill-${opt.id}`}
                      onClick={() => setSelectedCancelReason(label)}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                      style={{
                        backgroundColor: isActive ? 'var(--primary)' : 'var(--bg)',
                        color: isActive ? 'var(--on-primary)' : 'var(--text)',
                        borderColor: isActive ? 'var(--primary)' : 'var(--border)',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dialog Buttons: "Giữ lịch" (secondary) & "Hủy lịch" (destructive #B42318 / #7A271A) */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                data-testid="cancel-dialog-keep-btn"
                onClick={closeCancelDialog}
                className="btn-secondary min-h-[44px] px-5 py-2.5 text-sm font-bold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              >
                {isVi ? 'Giữ lịch' : 'Keep appointment'}
              </button>

              <button
                type="button"
                data-testid="cancel-dialog-confirm-btn"
                onClick={handleConfirmCancel}
                className="min-h-[44px] px-6 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                style={{
                  backgroundColor: darkMode ? '#7A271A' : '#B42318',
                  color: '#FFFFFF',
                }}
              >
                {isVi ? 'Hủy lịch' : 'Cancel appointment'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* RESCHEDULE DIALOG                                                   */}
      {/* =================================================================== */}
      {reschedulingBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={closeRescheduleDialog}
        >
          <div
            ref={rescheduleDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reschedule-dialog-title"
            data-testid="reschedule-booking-dialog"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[24px] border p-6 sm:p-7 space-y-5"
            style={{
              backgroundColor: 'var(--surface)',
              borderColor: 'var(--border)',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2
                  id="reschedule-dialog-title"
                  className="font-heading text-2xl font-extrabold"
                  style={{ color: 'var(--primary)' }}
                >
                  {isVi ? 'Đổi ngày & giờ hẹn' : 'Reschedule appointment'}
                </h2>
                <p className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {reschedulingBooking.code} · {reschedulingBooking.service}
                </p>
              </div>
              <button
                type="button"
                onClick={closeRescheduleDialog}
                aria-label={isVi ? 'Đóng hộp thoại đổi giờ' : 'Close reschedule dialog'}
                className="min-h-[44px] min-w-[44px] rounded-full border flex items-center justify-center shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveReschedule} className="space-y-5">
              {/* Date Picker */}
              <div>
                <label
                  htmlFor="reschedule-date-input"
                  className="block text-sm font-bold mb-1.5"
                  style={{ color: 'var(--text)' }}
                >
                  {isVi ? 'Chọn ngày hẹn mới *' : 'Choose new date *'}
                </label>
                <input
                  id="reschedule-date-input"
                  data-testid="reschedule-date-input"
                  type="date"
                  min={todayIso}
                  max={maxDateIso}
                  value={rescheduleDate}
                  onChange={(e) => {
                    setRescheduleDate(e.target.value);
                    setRescheduleError(null);
                  }}
                  className="form-input w-full font-bold tabular-nums"
                />
                {isDateClosed(rescheduleDate, todayIso) && (
                  <p
                    role="alert"
                    className="mt-1.5 text-xs font-bold"
                    style={{ color: darkMode ? '#FDA29B' : '#B42318' }}
                  >
                    {isVi
                      ? 'Trung tâm nghỉ bảo dưỡng định kỳ vào ngày này, vui lòng chọn ngày khác.'
                      : 'The clinic is closed on this date, please choose another day.'}
                  </p>
                )}
              </div>

              {/* Time Slot Picker (same as booking page, with current slot marked) */}
              <div>
                <span className="block text-sm font-bold mb-2" style={{ color: 'var(--text)' }}>
                  {isVi
                    ? 'Chọn khung giờ mới (08:00 – 19:00) *'
                    : 'Choose new time slot (08:00 – 19:00) *'}
                </span>
                {rescheduleSlots.length === 0 ? (
                  <p className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                    {isVi
                      ? 'Không có khung giờ trống trong ngày này.'
                      : 'No available time slots on this date.'}
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {rescheduleSlots.map((slot) => {
                      const isCurrentOriginalSlot =
                        rescheduleDate === reschedulingBooking.date &&
                        slot.time === reschedulingBooking.timeSlot;
                      const isSelected = rescheduleSlot === slot.time;

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={slot.disabled}
                          data-testid={`reschedule-slot-${slot.time}`}
                          onClick={() => {
                            setRescheduleSlot(slot.time);
                            setRescheduleError(null);
                          }}
                          className={`min-h-[48px] px-2 py-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B] ${
                            slot.disabled
                              ? 'opacity-45 !cursor-not-allowed'
                              : 'cursor-pointer'
                          }`}
                          style={{
                            backgroundColor: isSelected
                              ? 'var(--primary)'
                              : 'var(--bg)',
                            color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                            borderColor: isSelected
                              ? 'var(--primary)'
                              : isCurrentOriginalSlot
                              ? 'var(--coral)'
                              : 'var(--border)',
                          }}
                        >
                          <span className="text-sm font-extrabold tabular-nums">
                            {slot.time}
                          </span>
                          {isCurrentOriginalSlot && (
                            <span className="text-[10px] font-bold">
                              {isVi ? 'Giờ hiện tại' : 'Current'}
                            </span>
                          )}
                          {!isCurrentOriginalSlot && slot.disabled && (
                            <span className="text-[10px] font-semibold">
                              {isVi ? slot.reasonVi : slot.reasonEn}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {rescheduleError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2"
                  style={{
                    backgroundColor: 'var(--surface-2)',
                    borderColor: darkMode ? '#FDA29B' : '#B42318',
                    color: darkMode ? '#FDA29B' : '#B42318',
                  }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{rescheduleError}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeRescheduleDialog}
                  className="btn-secondary min-h-[44px] px-5 py-2.5 text-sm font-bold cursor-pointer"
                >
                  {isVi ? 'Đóng' : 'Close'}
                </button>
                <button
                  type="submit"
                  data-testid="reschedule-save-btn"
                  className="btn-primary min-h-[44px] px-6 py-2.5 text-sm font-bold cursor-pointer"
                >
                  {isVi ? 'Lưu giờ hẹn mới' : 'Save new time'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
