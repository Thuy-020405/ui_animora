import {
  Booking,
  BookingPetTypeId,
  BookingPreferredContact,
  BookingWeightRangeId,
  Language,
  PetSpecies,
} from '../types';
import { SERVICES_DATA, ServiceEntity, formatServicePrice } from './servicesData';

export interface TimeSlotConfig {
  openHour: number;
  closeHour: number;
  intervalMinutes: number;
  capacityPerSlot: number;
  maxAdvanceDays: number;
  closedWeekdays: number[]; // e.g., [] if open all week, or specific closed days
  closedDateOffsets: number[]; // relative to today, e.g. [5] for monthly clinic sterilization day
}

export const TIME_SLOT_CONFIG: TimeSlotConfig = {
  openHour: 8,
  closeHour: 19,
  intervalMinutes: 60,
  capacityPerSlot: 2,
  maxAdvanceDays: 60,
  closedWeekdays: [],
  closedDateOffsets: [5], // 5 days from today is closed for periodic clinic sanitization
};

export const BOOKING_PET_TYPES: {
  id: BookingPetTypeId;
  labelVi: string;
  labelEn: string;
}[] = [
  { id: 'Chó', labelVi: 'Chó', labelEn: 'Dog' },
  { id: 'Mèo', labelVi: 'Mèo', labelEn: 'Cat' },
  { id: 'Thỏ & chuột', labelVi: 'Thỏ & chuột', labelEn: 'Rabbit & rodent' },
  { id: 'Chim', labelVi: 'Chim', labelEn: 'Bird' },
  { id: 'Khác', labelVi: 'Khác', labelEn: 'Other' },
];

export const BOOKING_WEIGHT_RANGES: {
  id: BookingWeightRangeId;
  labelVi: string;
  labelEn: string;
  tableIndex: number;
}[] = [
  { id: 'under_5', labelVi: 'Dưới 5kg', labelEn: 'Under 5kg', tableIndex: 0 },
  { id: '5_to_10', labelVi: '5-10kg', labelEn: '5-10kg', tableIndex: 1 },
  { id: '10_to_20', labelVi: '10-20kg', labelEn: '10-20kg', tableIndex: 2 },
  { id: 'over_20', labelVi: 'Trên 20kg', labelEn: 'Over 20kg', tableIndex: 3 },
];

export const BOOKING_PREFERRED_CONTACTS: {
  id: BookingPreferredContact;
  labelVi: string;
  labelEn: string;
}[] = [
  { id: 'phone', labelVi: 'Điện thoại', labelEn: 'Phone' },
  { id: 'zalo', labelVi: 'Zalo', labelEn: 'Zalo' },
  { id: 'email', labelVi: 'Email', labelEn: 'Email' },
];

export function mapPetSpeciesToBookingPetType(species: PetSpecies | string): BookingPetTypeId {
  switch (species) {
    case 'Chó':
      return 'Chó';
    case 'Mèo':
      return 'Mèo';
    case 'Thỏ':
    case 'Hamster':
    case 'Thỏ & chuột':
      return 'Thỏ & chuột';
    case 'Chim':
      return 'Chim';
    default:
      return 'Khác';
  }
}

export function mapWeightStringToRangeId(weightStr?: string): BookingWeightRangeId {
  if (!weightStr) return 'under_5';
  const numMatch = weightStr.replace(',', '.').match(/(\d+(\.\d+)?)/);
  if (!numMatch) return 'under_5';
  const kg = parseFloat(numMatch[1]);
  if (isNaN(kg) || kg < 5) return 'under_5';
  if (kg <= 10) return '5_to_10';
  if (kg <= 20) return '10_to_20';
  return 'over_20';
}

export function getWeightRangeLabel(
  rangeId: BookingWeightRangeId | string | undefined,
  lang: Language
): string {
  const found = BOOKING_WEIGHT_RANGES.find((r) => r.id === rangeId);
  if (found) {
    return lang === 'vi' ? found.labelVi : found.labelEn;
  }
  return rangeId || (lang === 'vi' ? 'Dưới 5kg' : 'Under 5kg');
}

export function getPetTypeLabel(petType: BookingPetTypeId | string, lang: Language): string {
  const found = BOOKING_PET_TYPES.find((p) => p.id === petType);
  if (found) {
    return lang === 'vi' ? found.labelVi : found.labelEn;
  }
  return petType;
}

export function getPreferredContactLabel(
  contact: BookingPreferredContact | undefined,
  lang: Language
): string {
  const found = BOOKING_PREFERRED_CONTACTS.find((c) => c.id === (contact || 'phone'));
  if (!found) return lang === 'vi' ? 'Điện thoại' : 'Phone';
  return lang === 'vi' ? found.labelVi : found.labelEn;
}

export function resolveServiceBySlugOrName(query?: string | null): ServiceEntity {
  if (!query) return SERVICES_DATA[0];
  const clean = query.trim().toLowerCase();
  const matched = SERVICES_DATA.find(
    (s) =>
      s.slug.toLowerCase() === clean ||
      s.id.toLowerCase() === clean ||
      s.name.vi.toLowerCase() === clean ||
      s.name.en.toLowerCase() === clean
  );
  if (matched) return matched;
  if (clean.includes('tiêm') || clean.includes('vac') || clean.includes('khám')) {
    return SERVICES_DATA[0];
  }
  if (clean.includes('spa') || clean.includes('tắm')) {
    return SERVICES_DATA.find((s) => s.id === 'spa') || SERVICES_DATA[0];
  }
  if (clean.includes('răng') || clean.includes('nha')) {
    return SERVICES_DATA.find((s) => s.id === 'dental') || SERVICES_DATA[0];
  }
  return SERVICES_DATA[0];
}

export function estimateServicePrice(
  service: ServiceEntity,
  weightRange?: BookingWeightRangeId | string
): number {
  if (!service.dependsOnWeight || !weightRange) {
    return service.priceFrom;
  }
  const rangeObj = BOOKING_WEIGHT_RANGES.find((r) => r.id === weightRange);
  if (!rangeObj) return service.priceFrom;
  const row = service.priceTable[rangeObj.tableIndex];
  return row ? row.price : service.priceFrom;
}

export function formatEstimatedPriceText(
  service: ServiceEntity,
  weightRange: BookingWeightRangeId | string | undefined,
  lang: Language
): string {
  const amount = estimateServicePrice(service, weightRange);
  const priceStr = formatServicePrice(amount);
  const unit = service.priceUnit ? ` ${service.priceUnit[lang]}` : '';
  return lang === 'vi' ? `Từ ${priceStr}${unit}` : `From ${priceStr}${unit}`;
}

// ============================================================================
// DATE & TIME SLOT HELPERS
// ============================================================================

export function getTodayLocalIso(now: Date = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDaysToIso(isoDate: string, days: number): string {
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return isoDate;
  const dt = new Date(parts[0], parts[1] - 1, parts[2]);
  dt.setDate(dt.getDate() + days);
  return getTodayLocalIso(dt);
}

export function formatIsoDateForDisplay(isoDate: string, lang: Language): string {
  if (!isoDate) return '';
  const match = isoDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return isoDate;
  const [, yyyy, mm, dd] = match;
  if (lang === 'vi') {
    return `${dd}/${mm}/${yyyy}`;
  }
  const dt = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  return dt.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function parseVietnameseDateInput(input: string): string | null {
  const clean = input.trim();
  // Match dd/mm/yyyy or dd-mm-yyyy
  const dmyMatch = clean.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (dmyMatch) {
    const dd = Number(dmyMatch[1]);
    const mm = Number(dmyMatch[2]);
    const yyyy = Number(dmyMatch[3]);
    if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return null;
    const dt = new Date(yyyy, mm - 1, dd);
    if (
      dt.getFullYear() !== yyyy ||
      dt.getMonth() !== mm - 1 ||
      dt.getDate() !== dd
    ) {
      return null;
    }
    return `${yyyy}-${String(mm).padStart(2, '0')}-${String(dd).padStart(2, '0')}`;
  }
  // Match yyyy-mm-dd
  const isoMatch = clean.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    return clean;
  }
  return null;
}

export function isDateClosed(
  isoDate: string,
  todayIso: string = getTodayLocalIso(),
  config: TimeSlotConfig = TIME_SLOT_CONFIG
): boolean {
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return false;
  const dt = new Date(parts[0], parts[1] - 1, parts[2]);
  if (config.closedWeekdays.includes(dt.getDay())) {
    return true;
  }
  for (const offset of config.closedDateOffsets) {
    if (addDaysToIso(todayIso, offset) === isoDate) {
      return true;
    }
  }
  return false;
}

export function validateBookingDate(
  isoDate: string,
  todayIso: string = getTodayLocalIso(),
  config: TimeSlotConfig = TIME_SLOT_CONFIG
): { valid: boolean; reason?: 'empty' | 'past' | 'too_far' | 'closed' } {
  if (!isoDate) return { valid: false, reason: 'empty' };
  if (isoDate < todayIso) return { valid: false, reason: 'past' };
  const maxIso = addDaysToIso(todayIso, config.maxAdvanceDays);
  if (isoDate > maxIso) return { valid: false, reason: 'too_far' };
  if (isDateClosed(isoDate, todayIso, config)) return { valid: false, reason: 'closed' };
  return { valid: true };
}

export function generateDailyTimeSlots(config: TimeSlotConfig = TIME_SLOT_CONFIG): string[] {
  const slots: string[] = [];
  for (let h = config.openHour; h <= config.closeHour; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
  }
  return slots;
}

export interface TimeSlotAvailability {
  time: string;
  bookedCount: number;
  capacity: number;
  isFull: boolean;
  isPastToday: boolean;
  disabled: boolean;
  reasonVi?: string;
  reasonEn?: string;
}

export function getTimeSlotsForDate(
  isoDate: string,
  bookings: Booking[],
  now: Date = new Date(),
  config: TimeSlotConfig = TIME_SLOT_CONFIG
): TimeSlotAvailability[] {
  const todayIso = getTodayLocalIso(now);
  if (!isoDate || isDateClosed(isoDate, todayIso, config)) {
    return [];
  }

  const allSlots = generateDailyTimeSlots(config);
  const isToday = isoDate === todayIso;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return allSlots.map((time) => {
    const [hh, mm] = time.split(':').map(Number);
    const slotMinutes = hh * 60 + (mm || 0);
    const isPastToday = isToday && slotMinutes <= currentMinutes;

    const bookedCount = bookings.filter(
      (b) => b.date === isoDate && b.timeSlot === time && b.status !== 'Đã hủy'
    ).length;

    const isFull = bookedCount >= config.capacityPerSlot;
    const disabled = isFull || isPastToday;

    let reasonVi: string | undefined;
    let reasonEn: string | undefined;
    if (isFull) {
      reasonVi = 'Hết chỗ';
      reasonEn = 'Full';
    } else if (isPastToday) {
      reasonVi = 'Đã qua giờ';
      reasonEn = 'Passed';
    }

    return {
      time,
      bookedCount,
      capacity: config.capacityPerSlot,
      isFull,
      isPastToday,
      disabled,
      reasonVi,
      reasonEn,
    };
  });
}

export function findNextAvailableDate(
  fromIsoDate: string,
  bookings: Booking[],
  now: Date = new Date(),
  config: TimeSlotConfig = TIME_SLOT_CONFIG
): string {
  const todayIso = getTodayLocalIso(now);
  const startIso = fromIsoDate < todayIso ? todayIso : fromIsoDate;
  for (let i = 1; i <= config.maxAdvanceDays; i++) {
    const candidate = addDaysToIso(startIso, i);
    if (isDateClosed(candidate, todayIso, config)) continue;
    const slots = getTimeSlotsForDate(candidate, bookings, now, config);
    if (slots.some((s) => !s.disabled)) {
      return candidate;
    }
  }
  return addDaysToIso(todayIso, 1);
}

// ============================================================================
// SEEDED BOOKINGS (SO SOME SLOTS SHOW AS FULL & ONE DAY IS FULLY BOOKED)
// ============================================================================

export function getUpcomingWithin24hSlot(
  todayIso: string = getTodayLocalIso(),
  now: Date = new Date()
): { date: string; timeSlot: string } {
  const hour = now.getHours();
  if (hour <= 11) {
    return { date: todayIso, timeSlot: '18:00' };
  }
  return { date: addDaysToIso(todayIso, 1), timeSlot: '08:00' };
}

export function createSeededServiceBookings(
  todayIso: string = getTodayLocalIso(),
  now: Date = new Date()
): Booking[] {
  const tomorrow = addDaysToIso(todayIso, 1);
  const dayAfter = addDaysToIso(todayIso, 2);
  const fullyBookedDay = addDaysToIso(todayIso, 3);
  const upcoming4Days = addDaysToIso(todayIso, 4);
  const within24h = getUpcomingWithin24hSlot(todayIso, now);
  const past10Days = addDaysToIso(todayIso, -10);
  const past24Days = addDaysToIso(todayIso, -24);
  const past5Days = addDaysToIso(todayIso, -5);
  const past14Days = addDaysToIso(todayIso, -14);
  const allSlots = generateDailyTimeSlots(TIME_SLOT_CONFIG);

  const ownerBookings: Booking[] = [
    // 1. Upcoming #1 (> 24 hours away — can reschedule and cancel)
    {
      id: 'seed-owner-1',
      code: 'DL-2026-0001',
      userId: 'user-demo-owner',
      serviceSlug: 'kham-tong-quat',
      service: 'Khám tổng quát',
      petType: 'Mèo',
      petName: 'Mây Mây',
      petBreed: 'Scottish Fold · 2 tuổi',
      weightRange: 'under_5',
      date: upcoming4Days,
      timeSlot: '09:00',
      fullName: 'Phan Thị Đình Thùy',
      phone: '0337 203 332',
      email: 'phanthidinhthuy6@gmail.com',
      preferredContact: 'phone',
      note: 'Bé hơi nhát người lạ, nhờ bác sĩ khám nhẹ nhàng giúp gia đình.',
      status: 'Đã xác nhận',
      confirmedAt: `${addDaysToIso(todayIso, -1)}T10:30:00.000Z`,
      createdAt: `${addDaysToIso(todayIso, -2)}T08:15:00.000Z`,
    },
    // 2. Upcoming #2 (Within 24 hours — reschedule and cancel disabled with 24h notice)
    {
      id: 'seed-owner-2',
      code: 'DL-2026-0002',
      userId: 'user-demo-owner',
      serviceSlug: 'spa-tam',
      service: 'Spa & tắm',
      petType: 'Chó',
      petName: 'Bơ',
      petBreed: 'Golden Retriever · 1.5 tuổi',
      weightRange: 'over_20',
      date: within24h.date,
      timeSlot: within24h.timeSlot,
      fullName: 'Phan Thị Đình Thùy',
      phone: '0337 203 332',
      email: 'phanthidinhthuy6@gmail.com',
      preferredContact: 'zalo',
      note: 'Tắm thảo dược dịu nhẹ và cắt móng kỹ cho bé Bơ.',
      vaccinatedConfirmed: true,
      status: 'Mới',
      createdAt: `${todayIso}T01:00:00.000Z`,
    },
    // 3. Completed #1 (Past — vaccination / checkup for saved pet Mây Mây -> can add to pet profile)
    {
      id: 'seed-owner-3',
      code: 'DL-2026-0003',
      userId: 'user-demo-owner',
      serviceSlug: 'kham-tong-quat',
      service: 'Khám tổng quát',
      petType: 'Mèo',
      petName: 'Mây Mây',
      petBreed: 'Scottish Fold · 2 tuổi',
      weightRange: 'under_5',
      date: past10Days,
      timeSlot: '10:00',
      fullName: 'Phan Thị Đình Thùy',
      phone: '0337 203 332',
      email: 'phanthidinhthuy6@gmail.com',
      preferredContact: 'phone',
      note: 'Kiểm tra sức khỏe định kỳ và tiêm nhắc vắc-xin phòng bệnh.',
      status: 'Hoàn thành',
      confirmedAt: `${addDaysToIso(todayIso, -12)}T09:00:00.000Z`,
      completedAt: `${past10Days}T11:00:00.000Z`,
      createdAt: `${addDaysToIso(todayIso, -13)}T14:20:00.000Z`,
    },
    // 4. Completed #2 (Past — dental & small pet checkup for saved pet Bơ)
    {
      id: 'seed-owner-4',
      code: 'DL-2026-0004',
      userId: 'user-demo-owner',
      serviceSlug: 'nha-khoa-thu-nho',
      service: 'Nha khoa & Chăm sóc Thú nhỏ',
      petType: 'Chó',
      petName: 'Bơ',
      petBreed: 'Golden Retriever · 1.5 tuổi',
      weightRange: 'over_20',
      date: past24Days,
      timeSlot: '15:00',
      fullName: 'Phan Thị Đình Thùy',
      phone: '0337 203 332',
      email: 'phanthidinhthuy6@gmail.com',
      preferredContact: 'email',
      note: 'Lấy cao răng siêu âm và kiểm tra nướu định kỳ.',
      status: 'Hoàn thành',
      confirmedAt: `${addDaysToIso(todayIso, -26)}T10:00:00.000Z`,
      completedAt: `${past24Days}T16:00:00.000Z`,
      createdAt: `${addDaysToIso(todayIso, -27)}T09:30:00.000Z`,
    },
    // 5. Cancelled #1
    {
      id: 'seed-owner-5',
      code: 'DL-2026-0005',
      userId: 'user-demo-owner',
      serviceSlug: 'huan-luyen',
      service: 'Huấn luyện',
      petType: 'Chó',
      petName: 'Mochi',
      petBreed: 'Toy Poodle · 10 tháng',
      weightRange: 'under_5',
      date: past5Days,
      timeSlot: '14:00',
      fullName: 'Phan Thị Đình Thùy',
      phone: '0337 203 332',
      email: 'phanthidinhthuy6@gmail.com',
      preferredContact: 'phone',
      note: 'Lớp kỹ năng giao tiếp cơ bản cho cún con.',
      status: 'Đã hủy',
      cancelledAt: `${addDaysToIso(todayIso, -7)}T16:45:00.000Z`,
      cancelReason: 'Đổi kế hoạch',
      createdAt: `${addDaysToIso(todayIso, -9)}T11:00:00.000Z`,
    },
    // 6. No-show #1
    {
      id: 'seed-owner-6',
      code: 'DL-2026-0006',
      userId: 'user-demo-owner',
      serviceSlug: 'luu-tru',
      service: 'Lưu trú',
      petType: 'Thỏ & chuột',
      petName: 'Bông Gòn',
      petBreed: 'Thỏ Holland Lop · 9 tháng',
      weightRange: 'under_5',
      date: past14Days,
      timeSlot: '09:00',
      fullName: 'Phan Thị Đình Thùy',
      phone: '0337 203 332',
      email: 'phanthidinhthuy6@gmail.com',
      preferredContact: 'zalo',
      note: 'Phòng tiêu chuẩn có lót cỏ Timothy tươi.',
      vaccinatedConfirmed: true,
      status: 'Không đến',
      confirmedAt: `${addDaysToIso(todayIso, -16)}T10:15:00.000Z`,
      createdAt: `${addDaysToIso(todayIso, -17)}T08:00:00.000Z`,
    },
  ];

  const slotFixtureBookings: Booking[] = [
    // Tomorrow: 09:00 is FULL (2 bookings), 14:00 is FULL (2 bookings), 10:00 is available
    {
      id: 'seed-slot-1',
      code: 'DL-2026-0191',
      serviceSlug: 'kham-tong-quat',
      service: 'Khám tổng quát',
      petType: 'Chó',
      petName: 'Lucky',
      weightRange: 'over_20',
      date: tomorrow,
      timeSlot: '09:00',
      fullName: 'Khách đặt trước',
      phone: '0909112233',
      email: 'guest1@example.com',
      preferredContact: 'phone',
      status: 'Đã xác nhận',
      createdAt: '2026-10-28T08:00:00.000Z',
    },
    {
      id: 'seed-slot-2',
      code: 'DL-2026-0192',
      serviceSlug: 'spa-tam',
      service: 'Spa & tắm',
      petType: 'Mèo',
      petName: 'Miu',
      weightRange: 'under_5',
      date: tomorrow,
      timeSlot: '09:00',
      fullName: 'Khách đặt trước',
      phone: '0909112233',
      email: 'guest2@example.com',
      preferredContact: 'zalo',
      status: 'Đã xác nhận',
      createdAt: '2026-10-28T09:15:00.000Z',
    },
    {
      id: 'seed-slot-3',
      code: 'DL-2026-0193',
      serviceSlug: 'spa-tam',
      service: 'Spa & tắm',
      petType: 'Chó',
      petName: 'Lu',
      weightRange: 'under_5',
      date: tomorrow,
      timeSlot: '14:00',
      fullName: 'Khách đặt trước',
      phone: '0909112233',
      email: 'guest3@example.com',
      preferredContact: 'phone',
      status: 'Đã xác nhận',
      createdAt: '2026-10-29T10:00:00.000Z',
    },
    {
      id: 'seed-slot-4',
      code: 'DL-2026-0194',
      serviceSlug: 'nha-khoa-thu-nho',
      service: 'Nha khoa & Chăm sóc Thú nhỏ',
      petType: 'Thỏ & chuột',
      petName: 'Kem',
      weightRange: 'under_5',
      date: tomorrow,
      timeSlot: '14:00',
      fullName: 'Khách đặt trước',
      phone: '0909112233',
      email: 'guest4@example.com',
      preferredContact: 'zalo',
      status: 'Mới',
      createdAt: '2026-10-29T11:20:00.000Z',
    },
    // Day after tomorrow: 10:00 is FULL (2 bookings)
    {
      id: 'seed-slot-5',
      code: 'DL-2026-0195',
      serviceSlug: 'huan-luyen',
      service: 'Huấn luyện',
      petType: 'Chó',
      petName: 'Đậu Đậu',
      weightRange: '5_to_10',
      date: dayAfter,
      timeSlot: '10:00',
      fullName: 'Khách đặt trước',
      phone: '0909112233',
      email: 'guest5@example.com',
      preferredContact: 'phone',
      status: 'Đã xác nhận',
      createdAt: '2026-10-30T08:00:00.000Z',
    },
    {
      id: 'seed-slot-6',
      code: 'DL-2026-0196',
      serviceSlug: 'luu-tru',
      service: 'Lưu trú',
      petType: 'Mèo',
      petName: 'Búp Bê',
      weightRange: 'under_5',
      date: dayAfter,
      timeSlot: '10:00',
      fullName: 'Khách đặt trước',
      phone: '0909112233',
      email: 'guest6@example.com',
      preferredContact: 'email',
      status: 'Đã xác nhận',
      createdAt: '2026-10-30T09:00:00.000Z',
    },
  ];

  const seeded: Booking[] = [...ownerBookings, ...slotFixtureBookings];

  // Make `fullyBookedDay` (today + 3 days) completely full across all slots so empty-slot state can be tested
  allSlots.forEach((slot, idx) => {
    for (let c = 0; c < TIME_SLOT_CONFIG.capacityPerSlot; c++) {
      seeded.push({
        id: `seed-full-${idx}-${c}`,
        code: `DL-2026-01${idx}${c}`,
        serviceSlug: 'kham-tong-quat',
        service: 'Khám tổng quát',
        petType: 'Chó',
        petName: 'Milu',
        weightRange: '5_to_10',
        date: fullyBookedDay,
        timeSlot: slot,
        fullName: 'Khách đặt trước',
        phone: '0909112233',
        status: 'Đã xác nhận',
        createdAt: '2026-10-30T12:00:00.000Z',
      });
    }
  });

  return seeded;
}

// ============================================================================
// PHONE FIELD LOGIC (SINGLE SOURCE OF TRUTH: RAW DIGITS <= 10 CHARS)
// ============================================================================

export function cleanBookingPhoneDigits(raw: string): string {
  const trimmed = raw.trim();
  let digits = trimmed.replace(/\D/g, '');
  if (trimmed.startsWith('+84') && digits.startsWith('84')) {
    digits = '0' + digits.slice(2);
  } else if (digits.startsWith('84')) {
    digits = '0' + digits.slice(2);
  }
  return digits.slice(0, 10);
}

export function formatBookingPhoneOnBlur(rawDigits: string): string {
  const digits = cleanBookingPhoneDigits(rawDigits);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 10)}`;
}

export function validateBookingPhoneDigits(
  rawDigits: string,
  lang: Language
): string | null {
  const digits = cleanBookingPhoneDigits(rawDigits);
  if (digits.length === 0) {
    return lang === 'vi'
      ? 'Vui lòng nhập số điện thoại'
      : 'Please enter your phone number';
  }
  if (digits.length < 10) {
    return lang === 'vi'
      ? `Số điện thoại cần đủ 10 số (bạn đã nhập ${digits.length})`
      : `Phone number must be 10 digits (you entered ${digits.length})`;
  }
  if (!/^(03|05|07|08|09)\d{8}$/.test(digits)) {
    return lang === 'vi'
      ? 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09'
      : 'Phone number must start with 03, 05, 07, 08, or 09';
  }
  return null;
}

export function validateBookingEmail(email: string, lang: Language): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return lang === 'vi' ? 'Vui lòng nhập địa chỉ email' : 'Please enter your email address';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return lang === 'vi'
      ? 'Địa chỉ email không đúng định dạng'
      : 'Please enter a valid email address';
  }
  return null;
}

export function validateBookingFullName(name: string, lang: Language): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return lang === 'vi' ? 'Vui lòng nhập họ và tên' : 'Please enter your full name';
  }
  if (trimmed.length < 2) {
    return lang === 'vi'
      ? 'Họ và tên cần ít nhất 2 ký tự'
      : 'Full name must be at least 2 characters';
  }
  return null;
}

export function validateBookingPetName(petName: string, lang: Language): string | null {
  const trimmed = petName.trim();
  if (!trimmed) {
    return lang === 'vi' ? 'Vui lòng nhập tên của bé' : "Please enter your pet's name";
  }
  return null;
}

// ============================================================================
// BOOKING CODE & ICS CALENDAR GENERATOR
// ============================================================================

export function generateServiceBookingCode(existingBookingsCount = 0): string {
  const seq = String(Math.max(1, existingBookingsCount + 1)).padStart(4, '0');
  const randSuffix = Math.floor(1000 + Math.random() * 9000);
  // Format like DL-2026-0001 or DL-2026-XXXX
  return existingBookingsCount >= 0 && existingBookingsCount < 9999
    ? `DL-2026-${seq}`
    : `DL-2026-${randSuffix}`;
}

export function generateBookingIcsContent(booking: Booking, lang: Language): string {
  const dateParts = (booking.date || getTodayLocalIso()).split('-').map(Number);
  const timeParts = (booking.timeSlot || '09:00').split(':').map(Number);
  const year = dateParts[0] || 2026;
  const month = (dateParts[1] || 1) - 1;
  const day = dateParts[2] || 1;
  const hour = timeParts[0] ?? 9;
  const minute = timeParts[1] ?? 0;

  const startDt = new Date(year, month, day, hour, minute, 0);
  const endDt = new Date(startDt.getTime() + 60 * 60 * 1000);

  const toIcsTimestamp = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
      `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}` +
      `T${pad(d.getHours())}${pad(d.getMinutes())}00`
    );
  };

  const summary =
    lang === 'vi'
      ? `Animora: ${booking.service} cho bé ${booking.petName || booking.petType}`
      : `Animora: ${booking.service} for ${booking.petName || booking.petType}`;

  const description = [
    `Mã lịch hẹn / Booking Code: ${booking.code || booking.id}`,
    `Dịch vụ / Service: ${booking.service}`,
    `Thú cưng / Pet: ${booking.petName || ''} (${booking.petType})`,
    `Khách hàng / Customer: ${booking.fullName} - ${booking.phone}`,
    `Hotline Animora: 0337 203 332`,
  ].join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Animora Pet Care//Service Booking//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${booking.code || booking.id}@animora.vn`,
    `DTSTAMP:${toIcsTimestamp(new Date())}`,
    `DTSTART:${toIcsTimestamp(startDt)}`,
    `DTEND:${toIcsTimestamp(endDt)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'LOCATION:Animora Veterinary & Holistic Spa Center',
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

// ============================================================================
// URL PARSER FOR /dat-lich AND /dat-lich/thanh-cong
// ============================================================================

export interface ServiceBookingUrlState {
  isBookingRoute: boolean;
  isSuccessRoute: boolean;
  preselectedServiceSlug: string | null;
}

export function parseServiceBookingUrl(
  pathname: string,
  search: string = ''
): ServiceBookingUrlState {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(search);
  const serviceParam = params.get('service');

  if (cleanPath === '/dat-lich/thanh-cong') {
    return {
      isBookingRoute: true,
      isSuccessRoute: true,
      preselectedServiceSlug: serviceParam ? resolveServiceBySlugOrName(serviceParam).slug : null,
    };
  }

  if (cleanPath === '/dat-lich') {
    return {
      isBookingRoute: true,
      isSuccessRoute: false,
      preselectedServiceSlug: serviceParam ? resolveServiceBySlugOrName(serviceParam).slug : null,
    };
  }

  return {
    isBookingRoute: false,
    isSuccessRoute: false,
    preselectedServiceSlug: null,
  };
}
