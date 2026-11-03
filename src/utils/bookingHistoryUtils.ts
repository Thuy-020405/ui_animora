import {
  Booking,
  BookingStatus,
  Language,
  Pet,
  UserAccount,
} from '../types';
import {
  cleanBookingPhoneDigits,
  resolveServiceBySlugOrName,
  getTodayLocalIso,
} from '../data/serviceBookingData';
import { CareRecord, CareRecordType, offsetDaysIso } from '../data/petProfilesData';

export const CANCEL_HOURS = 24;
export const MAX_LOOKUP_ATTEMPTS_PER_MINUTE = 5;
export const LOOKUP_WINDOW_MS = 60 * 1000;

export type BookingTabCategory = 'upcoming' | 'past' | 'cancelled';
export type BookingSortOrder = 'nearest' | 'farthest';

export interface CancelReasonOption {
  id: string;
  labelVi: string;
  labelEn: string;
}

export const CANCEL_REASON_OPTIONS: CancelReasonOption[] = [
  { id: 'change_plan', labelVi: 'Đổi kế hoạch', labelEn: 'Change of plans' },
  { id: 'other_slot', labelVi: 'Tìm được lịch khác', labelEn: 'Found another time' },
  { id: 'pet_unwell', labelVi: 'Bé không khỏe', labelEn: 'Pet is unwell' },
  { id: 'other', labelVi: 'Khác', labelEn: 'Other' },
];

/**
 * Masks a phone number for list display: e.g. "0337 203 332" -> "0337 *** 332"
 */
export function maskBookingPhone(phone: string): string {
  const digits = cleanBookingPhoneDigits(phone);
  if (digits.length < 7) return phone || '***';
  const prefix = digits.slice(0, 4);
  const suffix = digits.slice(-3);
  return `${prefix} *** ${suffix}`;
}

/**
 * Masks an email for list display: e.g. "phanthidinhthuy6@gmail.com" -> "p***@gmail.com"
 */
export function maskBookingEmail(email?: string): string {
  if (!email || !email.trim()) return '';
  const clean = email.trim();
  const atIndex = clean.indexOf('@');
  if (atIndex <= 0) return '***';
  const firstChar = clean.charAt(0);
  const domain = clean.slice(atIndex + 1);
  return `${firstChar}***@${domain}`;
}

/**
 * Parses a booking's date (YYYY-MM-DD) and timeSlot (HH:mm) into a local Date
 */
export function getBookingDateTime(booking: Pick<Booking, 'date' | 'timeSlot'>): Date {
  const [y, m, d] = (booking.date || '2026-01-01').split('-').map(Number);
  const [hh, mm] = (booking.timeSlot || '09:00').split(':').map(Number);
  return new Date(y || 2026, (m || 1) - 1, d || 1, hh ?? 9, mm ?? 0, 0, 0);
}

/**
 * Computes exact hours remaining until the appointment
 */
export function getHoursUntilBooking(
  booking: Pick<Booking, 'date' | 'timeSlot'>,
  now: Date = new Date()
): number {
  const target = getBookingDateTime(booking);
  return (target.getTime() - now.getTime()) / (1000 * 60 * 60);
}

/**
 * Checks if a booking's appointment time is in the future
 */
export function isBookingInFuture(
  booking: Pick<Booking, 'date' | 'timeSlot'>,
  now: Date = new Date()
): boolean {
  return getHoursUntilBooking(booking, now) > 0;
}

/**
 * Determines whether a booking can be cancelled or rescheduled:
 * - Allowed ONLY for status "Mới" or "Đã xác nhận"
 * - AND appointment is at least CANCEL_HOURS (24h) away
 */
export function canModifyBooking(
  booking: Booking,
  now: Date = new Date()
): {
  allowed: boolean;
  reason?: 'status' | 'within_24h' | 'past';
  hoursRemaining: number;
} {
  const status: BookingStatus = booking.status || 'Mới';
  const hoursRemaining = getHoursUntilBooking(booking, now);

  if (status !== 'Mới' && status !== 'Đã xác nhận') {
    return { allowed: false, reason: 'status', hoursRemaining };
  }

  if (hoursRemaining <= 0) {
    return { allowed: false, reason: 'past', hoursRemaining };
  }

  if (hoursRemaining < CANCEL_HOURS) {
    return { allowed: false, reason: 'within_24h', hoursRemaining };
  }

  return { allowed: true, hoursRemaining };
}

/**
 * Computes the upcoming countdown chip text ("Hôm nay" / "Ngày mai" / "Còn X ngày")
 */
export function getUpcomingCountdownText(
  booking: Pick<Booking, 'date' | 'timeSlot'>,
  lang: Language,
  now: Date = new Date()
): string | null {
  if (!isBookingInFuture(booking, now)) return null;
  const [y, m, d] = (booking.date || '').split('-').map(Number);
  if (!y || !m || !d) return null;

  const targetDay = new Date(y, m - 1, d);
  const todayDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round(
    (targetDay.getTime() - todayDay.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) {
    return lang === 'vi' ? 'Hôm nay' : 'Today';
  }
  if (diffDays === 1) {
    return lang === 'vi' ? 'Ngày mai' : 'Tomorrow';
  }
  return lang === 'vi' ? `Còn ${diffDays} ngày` : `In ${diffDays} days`;
}

/**
 * Formats date and time with weekday: e.g. "Thứ Sáu, 20/11/2026 · 09:00"
 */
export function formatBookingDateWithWeekday(
  isoDate: string,
  timeSlot: string | undefined,
  lang: Language
): string {
  const match = (isoDate || '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return `${isoDate}${timeSlot ? ` · ${timeSlot}` : ''}`;
  const [, yyyy, mm, dd] = match;
  const dt = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  const dayOfWeek = dt.getDay();

  const weekdaysVi = [
    'Chủ Nhật',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ];
  const weekdaysEn = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const weekday = lang === 'vi' ? weekdaysVi[dayOfWeek] : weekdaysEn[dayOfWeek];
  const formattedDate = `${dd}/${mm}/${yyyy}`;
  const slot = timeSlot || '09:00';

  return `${weekday}, ${formattedDate} · ${slot}`;
}

/**
 * Categorizes a booking into "upcoming" (Sắp tới), "past" (Đã qua), or "cancelled" (Đã hủy)
 */
export function getBookingTabCategory(
  booking: Booking,
  now: Date = new Date()
): BookingTabCategory {
  const status: BookingStatus = booking.status || 'Mới';
  if (status === 'Đã hủy') {
    return 'cancelled';
  }
  if (status === 'Hoàn thành' || status === 'Không đến') {
    return 'past';
  }
  if (isBookingInFuture(booking, now)) {
    return 'upcoming';
  }
  return 'past';
}

/**
 * Checks whether a booking belongs to the logged-in user
 * (matched by userId, or by normalized phone, or by lowercase email)
 */
export function doesBookingBelongToUser(
  booking: Booking,
  user: UserAccount | null
): boolean {
  if (!user) return false;
  // Exclude anonymous slot capacity fixture bookings
  if (booking.id.startsWith('seed-full-') || booking.id.startsWith('seed-slot-')) {
    return false;
  }
  if (booking.userId && booking.userId === user.id) {
    return true;
  }
  const bkPhone = cleanBookingPhoneDigits(booking.phone || '');
  const userPhone = cleanBookingPhoneDigits(user.phone || '');
  if (bkPhone && userPhone && bkPhone === userPhone) {
    return true;
  }
  const bkEmail = (booking.email || '').trim().toLowerCase();
  const userEmail = (user.email || '').trim().toLowerCase();
  if (bkEmail && userEmail && bkEmail === userEmail) {
    return true;
  }
  return false;
}

/**
 * Filters and sorts bookings for a tab, pet filter, and sort order
 */
export function filterAndSortBookings(
  bookings: Booking[],
  options: {
    tab: BookingTabCategory;
    petFilter?: string;
    sortOrder?: BookingSortOrder;
    now?: Date;
  }
): Booking[] {
  const now = options.now || new Date();
  const petFilter = (options.petFilter || 'all').trim();
  const sortOrder = options.sortOrder || 'nearest';

  const filtered = bookings.filter((b) => {
    if (getBookingTabCategory(b, now) !== options.tab) return false;
    if (petFilter !== 'all' && petFilter !== '') {
      if ((b.petName || '').trim().toLowerCase() !== petFilter.toLowerCase()) {
        return false;
      }
    }
    return true;
  });

  const nowMs = now.getTime();
  return filtered.slice().sort((a, b) => {
    const distA = Math.abs(getBookingDateTime(a).getTime() - nowMs);
    const distB = Math.abs(getBookingDateTime(b).getTime() - nowMs);
    return sortOrder === 'nearest' ? distA - distB : distB - distA;
  });
}

/**
 * Generic mismatch error message for visitor lookup (does not reveal which field was wrong)
 */
export function getGenericLookupError(lang: Language): string {
  return lang === 'vi'
    ? 'Không tìm thấy lịch hẹn. Vui lòng kiểm tra lại mã và số điện thoại.'
    : 'Booking not found. Please check your booking code and phone number.';
}

/**
 * Rate limiter for visitor booking lookup (max 5 attempts per minute per browser)
 */
export function checkLookupRateLimit(
  attemptTimestamps: number[],
  nowMs: number = Date.now()
): {
  allowed: boolean;
  updatedTimestamps: number[];
} {
  const recent = attemptTimestamps.filter((ts) => nowMs - ts < LOOKUP_WINDOW_MS);
  if (recent.length >= MAX_LOOKUP_ATTEMPTS_PER_MINUTE) {
    return { allowed: false, updatedTimestamps: recent };
  }
  return { allowed: true, updatedTimestamps: [...recent, nowMs] };
}

/**
 * Looks up a single booking by booking code (case-insensitive, trimmed) and normalized phone
 */
export function lookupSingleBooking(
  bookings: Booking[],
  codeInput: string,
  phoneInput: string,
  lang: Language,
  honeypotValue = ''
): {
  found: Booking | null;
  error: string | null;
} {
  const genericError = getGenericLookupError(lang);
  if (honeypotValue && honeypotValue.trim() !== '') {
    return { found: null, error: genericError };
  }

  const cleanCode = (codeInput || '').trim().toUpperCase();
  const cleanPhone = cleanBookingPhoneDigits(phoneInput || '');

  if (!cleanCode || cleanPhone.length !== 10) {
    return { found: null, error: genericError };
  }

  const matched = bookings.find((b) => {
    if (b.id.startsWith('seed-full-') || b.id.startsWith('seed-slot-')) return false;
    const bkCode = (b.code || '').trim().toUpperCase();
    const bkPhone = cleanBookingPhoneDigits(b.phone || '');
    return bkCode === cleanCode && bkPhone === cleanPhone;
  });

  if (!matched) {
    return { found: null, error: genericError };
  }

  return { found: matched, error: null };
}

/**
 * Determines if a completed booking is eligible for "Thêm vào hồ sơ của bé" (vaccination, deworming, or checkup)
 * and matches a saved pet profile.
 */
export function evaluateAddBookingToPetProfile(
  booking: Booking,
  pets: Pet[]
): {
  eligible: boolean;
  matchedPet: Pet | null;
  careType: CareRecordType | null;
} {
  if (booking.status !== 'Hoàn thành') {
    return { eligible: false, matchedPet: null, careType: null };
  }

  const petNameClean = (booking.petName || '').trim().toLowerCase();
  if (!petNameClean) {
    return { eligible: false, matchedPet: null, careType: null };
  }

  const matchedPet =
    pets.find((p) => p.name.trim().toLowerCase() === petNameClean) || null;
  if (!matchedPet) {
    return { eligible: false, matchedPet: null, careType: null };
  }

  const resolvedService = resolveServiceBySlugOrName(
    booking.serviceSlug || booking.service
  );
  const textLower = `${booking.service || ''} ${booking.note || ''} ${resolvedService.slug}`.toLowerCase();

  let careType: CareRecordType | null = null;
  if (textLower.includes('tiêm') || textLower.includes('vắc-xin') || textLower.includes('vac')) {
    careType = 'vaccine';
  } else if (textLower.includes('tẩy giun') || textLower.includes('ký sinh') || textLower.includes('deworm')) {
    careType = 'deworm';
  } else if (
    resolvedService.id === 'checkup' ||
    resolvedService.id === 'dental' ||
    textLower.includes('khám') ||
    textLower.includes('checkup')
  ) {
    careType = 'checkup';
  }

  if (!careType) {
    return { eligible: false, matchedPet: null, careType: null };
  }

  return { eligible: true, matchedPet, careType };
}

/**
 * Builds a CareRecord from a completed booking for the matched pet
 */
export function createCareRecordFromBooking(
  booking: Booking,
  matchedPet: Pet,
  careType: CareRecordType
): CareRecord {
  const resolvedService = resolveServiceBySlugOrName(
    booking.serviceSlug || booking.service
  );
  const performedDate = booking.date || getTodayLocalIso();
  const baseDt = new Date(performedDate);
  const nextDue = !Number.isNaN(baseDt.getTime())
    ? offsetDaysIso(180, baseDt)
    : undefined;

  return {
    id: `care-from-bk-${booking.code || booking.id}`,
    pet: matchedPet.id,
    type: careType,
    name: `${resolvedService.name.vi}${booking.code ? ` (${booking.code})` : ''}`,
    nameEn: `${resolvedService.name.en}${booking.code ? ` (${booking.code})` : ''}`,
    date: performedDate,
    nextDueDate: nextDue,
    notes:
      booking.note ||
      `Đồng bộ từ lịch hẹn ${booking.code || booking.id} tại trung tâm Animora.`,
    notesEn:
      booking.note ||
      `Synced from appointment ${booking.code || booking.id} at Animora.`,
    status: 'done',
  };
}

/**
 * Builds the prefilled booking URL for "Đặt lại" (Book again): /dat-lich?service={slug}&pet={pet}
 */
export function buildRebookUrl(booking: Booking): string {
  const srv = resolveServiceBySlugOrName(booking.serviceSlug || booking.service);
  const params = new URLSearchParams();
  params.set('service', srv.slug);
  if (booking.petName && booking.petName.trim()) {
    params.set('pet', booking.petName.trim());
  }
  return `/dat-lich?${params.toString()}`;
}

/**
 * Parses /lich-hen and /lich-hen/{code} URLs
 */
export function parseMyBookingsUrl(
  pathname: string,
  search = ''
): {
  isMyBookingsRoute: boolean;
  detailCode: string | null;
  queryCode: string | null;
} {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);
  const queryCode = params.get('code')?.trim().toUpperCase() || null;

  if (cleanPath === '/lich-hen') {
    return {
      isMyBookingsRoute: true,
      detailCode: null,
      queryCode,
    };
  }

  const detailMatch = cleanPath.match(/^\/lich-hen\/([^/]+)$/);
  if (detailMatch) {
    const code = decodeURIComponent(detailMatch[1]).trim().toUpperCase();
    return {
      isMyBookingsRoute: true,
      detailCode: code || null,
      queryCode: queryCode || code || null,
    };
  }

  return {
    isMyBookingsRoute: false,
    detailCode: null,
    queryCode: null,
  };
}
