import { Language, Pet, PetSpecies, Gender } from '../types';

export type CareRecordType = 'vaccine' | 'deworm' | 'checkup' | 'spa';

export type ComputedCareStatus = 'done' | 'upcoming' | 'overdue';

export interface WeightLog {
  id: string;
  pet: string; // petId
  date: string; // YYYY-MM-DD
  kg: number;
}

export interface CareRecord {
  id: string;
  pet: string; // petId
  type: CareRecordType;
  name: string;
  nameEn?: string;
  date: string; // YYYY-MM-DD (performed date)
  nextDueDate?: string; // YYYY-MM-DD
  notes?: string;
  notesEn?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  status: ComputedCareStatus;
}

export interface PetProfileEntity extends Pet {
  breedEn?: string;
  ageEn?: string;
  birthDate: string; // YYYY-MM-DD
  coatColor: string;
  coatColorEn: string;
  allergies: string; // empty string or 'Không có' if none
  allergiesEn: string;
  microchip: string;
  neutered: boolean;
  vaccinated?: boolean;
}

/**
 * Formats a Date object as local YYYY-MM-DD
 */
export function toLocalIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Adds `days` to a base Date and returns YYYY-MM-DD in local time
 */
export function offsetDaysIso(days: number, baseDate: Date = new Date()): string {
  const copy = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());
  copy.setDate(copy.getDate() + days);
  return toLocalIsoDate(copy);
}

/**
 * Parses either YYYY-MM-DD or DD/MM/YYYY into a local midnight Date
 */
export function parseLocalDate(dateStr?: string): Date | null {
  if (!dateStr || !dateStr.trim()) return null;
  const clean = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const [y, m, d] = clean.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(clean)) {
    const [d, m, y] = clean.split('/').map(Number);
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(clean);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

/**
 * Formats YYYY-MM-DD or DD/MM/YYYY into DD/MM/YYYY for display
 */
export function formatDisplayDate(dateStr?: string, lang: Language = 'vi'): string {
  const d = parseLocalDate(dateStr);
  if (!d) return dateStr || '';
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return lang === 'vi' ? `${day}/${month}/${year}` : `${day}/${month}/${year}`;
}

/**
 * Computes day difference between a target date and today's local date.
 * Positive = days remaining in future; 0 = due today; Negative = days overdue.
 */
export function computeDaysFromToday(
  targetDateStr?: string,
  now: Date = new Date()
): number | null {
  const target = parseLocalDate(targetDateStr);
  if (!target) return null;
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export interface DueEvaluation {
  status: ComputedCareStatus;
  daysDiff: number | null; // < 0 means overdue by |daysDiff|, >= 0 means due in daysDiff
  isDueSoonOrOverdue: boolean;
}

/**
 * Evaluates a CareRecord's live status based on nextDueDate and local date.
 * Upcoming window: within 60 days in the future.
 */
export function evaluateCareRecordDue(
  record: CareRecord,
  now: Date = new Date()
): DueEvaluation {
  if (!record.nextDueDate) {
    return { status: 'done', daysDiff: null, isDueSoonOrOverdue: false };
  }
  const diff = computeDaysFromToday(record.nextDueDate, now);
  if (diff === null) {
    return { status: 'done', daysDiff: null, isDueSoonOrOverdue: false };
  }
  if (diff < 0) {
    return { status: 'overdue', daysDiff: diff, isDueSoonOrOverdue: true };
  }
  if (diff <= 60) {
    return { status: 'upcoming', daysDiff: diff, isDueSoonOrOverdue: true };
  }
  return { status: 'done', daysDiff: diff, isDueSoonOrOverdue: false };
}

/**
 * Returns type-specific status pill label & style category for a CareRecord
 */
export function getCareRecordStatusBadge(
  record: CareRecord,
  lang: Language,
  now: Date = new Date()
): {
  label: string;
  variant: 'done' | 'upcoming' | 'overdue';
  daysDiff: number | null;
} {
  const evalResult = evaluateCareRecordDue(record, now);

  if (evalResult.status === 'overdue') {
    return {
      label: lang === 'vi' ? 'Quá hạn' : 'Overdue',
      variant: 'overdue',
      daysDiff: evalResult.daysDiff,
    };
  }

  if (evalResult.status === 'upcoming' && evalResult.daysDiff !== null) {
    const d = Math.max(0, evalResult.daysDiff);
    return {
      label:
        d === 0
          ? lang === 'vi'
            ? 'Hôm nay'
            : 'Due today'
          : lang === 'vi'
          ? `Còn ${d} ngày`
          : `${d} days left`,
      variant: 'upcoming',
      daysDiff: d,
    };
  }

  // Completed / Done: type-specific label
  const typeDoneLabels: Record<CareRecordType, { vi: string; en: string }> = {
    vaccine: { vi: 'Đã tiêm', en: 'Vaccinated' },
    deworm: { vi: 'Đã tẩy giun', en: 'Dewormed' },
    checkup: { vi: 'Đã khám', en: 'Checked' },
    spa: { vi: 'Đã hoàn thành', en: 'Done' },
  };

  const labelObj = typeDoneLabels[record.type] || typeDoneLabels.spa;
  return {
    label: lang === 'vi' ? labelObj.vi : labelObj.en,
    variant: 'done',
    daysDiff: evalResult.daysDiff,
  };
}

export interface NearestReminderResult {
  state: 'overdue' | 'upcoming' | 'up_to_date';
  record?: CareRecord;
  itemName?: string;
  days: number; // positive integer (days overdue or days left)
  servicePreselect: string;
}

export function mapCareTypeToBookingService(type: CareRecordType, lang: Language): string {
  switch (type) {
    case 'vaccine':
      return lang === 'vi' ? 'Tiêm phòng & Xét nghiệm' : 'Vaccination & Lab Tests';
    case 'deworm':
      return lang === 'vi' ? 'Tiêm phòng & Ký sinh trùng' : 'Deworming & Parasite Care';
    case 'checkup':
      return lang === 'vi' ? 'Khám tổng quát' : 'General Checkup';
    case 'spa':
      return lang === 'vi' ? 'Spa Thảo dược' : 'Herbal Spa & Grooming';
  }
}

/**
 * Picks the nearest upcoming or overdue CareRecord for a pet.
 * Priority: most overdue first (or nearest due date), then nearest upcoming item within 60 days.
 */
export function getNearestReminderForPet(
  records: CareRecord[],
  lang: Language,
  now: Date = new Date()
): NearestReminderResult {
  const candidates = records
    .map((r) => ({ record: r, eval: evaluateCareRecordDue(r, now) }))
    .filter((item) => item.eval.isDueSoonOrOverdue && item.eval.daysDiff !== null);

  if (candidates.length === 0) {
    return {
      state: 'up_to_date',
      days: 0,
      servicePreselect: lang === 'vi' ? 'Khám tổng quát' : 'General Checkup',
    };
  }

  // Sort by daysDiff ascending (negative overdue items come first, then smallest positive days)
  candidates.sort((a, b) => (a.eval.daysDiff ?? 0) - (b.eval.daysDiff ?? 0));
  const best = candidates[0];
  const diff = best.eval.daysDiff ?? 0;
  const itemName =
    lang === 'en' && best.record.nameEn ? best.record.nameEn : best.record.name;

  if (diff < 0) {
    return {
      state: 'overdue',
      record: best.record,
      itemName,
      days: Math.abs(diff),
      servicePreselect: mapCareTypeToBookingService(best.record.type, lang),
    };
  }

  return {
    state: 'upcoming',
    record: best.record,
    itemName,
    days: diff,
    servicePreselect: mapCareTypeToBookingService(best.record.type, lang),
  };
}

/**
 * Checks whether a pet has any due-soon (within 30 days) or overdue item for the selector dot badge
 */
export function hasPetDueSoonOrOverdue(
  records: CareRecord[],
  now: Date = new Date()
): boolean {
  return records.some((r) => {
    const ev = evaluateCareRecordDue(r, now);
    return ev.status === 'overdue' || (ev.status === 'upcoming' && (ev.daysDiff ?? 99) <= 30);
  });
}

/**
 * Sorts CareRecords newest first by performed `date`, and groups by year
 */
export function sortAndGroupCareRecords(
  records: CareRecord[],
  filterType: 'all' | CareRecordType = 'all'
): {
  filtered: CareRecord[];
  groupedByYear: { year: string; items: CareRecord[] }[];
  showYearGroups: boolean;
} {
  const filtered = records
    .filter((r) => (filterType === 'all' ? true : r.type === filterType))
    .slice()
    .sort((a, b) => {
      const da = parseLocalDate(a.date)?.getTime() ?? 0;
      const db = parseLocalDate(b.date)?.getTime() ?? 0;
      return db - da;
    });

  const yearMap = new Map<string, CareRecord[]>();
  for (const r of filtered) {
    const d = parseLocalDate(r.date);
    const year = d ? String(d.getFullYear()) : 'Khác';
    const list = yearMap.get(year) || [];
    list.push(r);
    yearMap.set(year, list);
  }

  const groupedByYear = Array.from(yearMap.entries()).map(([year, items]) => ({
    year,
    items,
  }));

  const showYearGroups = groupedByYear.length > 1 || filtered.length >= 4;

  return { filtered, groupedByYear, showYearGroups };
}

export interface WeightTrendPoint {
  x: number;
  y: number;
  date: string;
  kg: number;
}

export interface WeightTrendSummary {
  lastSix: WeightLog[];
  latestKg: number;
  deltaKg: number;
  formattedLatest: string;
  formattedDelta: string;
  linePath: string;
  areaPath: string;
  points: WeightTrendPoint[];
}

export function formatWeightNumber(kg: number, lang: Language): string {
  const rounded2 = Math.round(kg * 100) / 100;
  const hasHundredths = Math.round((rounded2 * 10) % 1 * 10) !== 0;
  const fixed = hasHundredths ? rounded2.toFixed(2) : rounded2.toFixed(1);
  return lang === 'vi' ? fixed.replace('.', ',') : fixed;
}

/**
 * Computes SVG sparkline coordinates and delta from the last 6 WeightLogs
 */
export function computeWeightTrend(
  logs: WeightLog[],
  lang: Language = 'vi',
  width = 240,
  height = 80
): WeightTrendSummary {
  const sorted = logs
    .slice()
    .sort((a, b) => (parseLocalDate(a.date)?.getTime() ?? 0) - (parseLocalDate(b.date)?.getTime() ?? 0));
  const lastSix = sorted.slice(-6);

  if (lastSix.length === 0) {
    return {
      lastSix: [],
      latestKg: 0,
      deltaKg: 0,
      formattedLatest: '0 kg',
      formattedDelta: '0,0 kg',
      linePath: '',
      areaPath: '',
      points: [],
    };
  }

  const latestKg = lastSix[lastSix.length - 1].kg;
  const prevKg = lastSix.length > 1 ? lastSix[lastSix.length - 2].kg : latestKg;
  const deltaKg = Number((latestKg - prevKg).toFixed(2));

  const formattedLatest = `${formatWeightNumber(latestKg, lang)} kg`;
  const sign = deltaKg > 0 ? '+' : deltaKg < 0 ? '-' : '±';
  const formattedDelta = `${sign}${formatWeightNumber(Math.abs(deltaKg), lang)} kg`;

  const padX = 12;
  const padTop = 14;
  const padBottom = 14;
  const usableW = Math.max(10, width - padX * 2);
  const usableH = Math.max(10, height - padTop - padBottom);

  const values = lastSix.map((l) => l.kg);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || Math.max(0.2, maxVal * 0.1);

  const points: WeightTrendPoint[] = lastSix.map((item, idx) => {
    const x =
      lastSix.length === 1
        ? width / 2
        : Number((padX + (idx / (lastSix.length - 1)) * usableW).toFixed(1));
    const norm = (item.kg - minVal) / range;
    const y = Number((padTop + usableH - norm * usableH).toFixed(1));
    return { x, y, date: item.date, kg: item.kg };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const firstX = points[0].x;
  const lastX = points[points.length - 1].x;
  const baselineY = height - 4;
  const areaPath = `${linePath} L ${lastX} ${baselineY} L ${firstX} ${baselineY} Z`;

  return {
    lastSix,
    latestKg,
    deltaKg,
    formattedLatest,
    formattedDelta,
    linePath,
    areaPath,
    points,
  };
}

/**
 * Validates the Add/Edit CareRecord modal fields
 */
export function validateCareRecordInput(input: {
  type?: string;
  name?: string;
  date?: string;
  nextDueDate?: string;
  fileSize?: number;
  fileType?: string;
}): { valid: boolean; errorVi?: string; errorEn?: string } {
  const validTypes: CareRecordType[] = ['vaccine', 'deworm', 'checkup', 'spa'];
  if (!input.type || !validTypes.includes(input.type as CareRecordType)) {
    return {
      valid: false,
      errorVi: 'Vui lòng chọn phân loại chăm sóc hợp lệ.',
      errorEn: 'Please select a valid care category.',
    };
  }
  if (!input.name || !input.name.trim()) {
    return {
      valid: false,
      errorVi: 'Vui lòng nhập tên mũi tiêm hoặc lịch chăm sóc.',
      errorEn: 'Please enter the vaccine or care record name.',
    };
  }
  const perfDate = parseLocalDate(input.date);
  if (!perfDate) {
    return {
      valid: false,
      errorVi: 'Vui lòng chọn ngày thực hiện hợp lệ.',
      errorEn: 'Please select a valid performed date.',
    };
  }
  if (input.nextDueDate && input.nextDueDate.trim()) {
    const due = parseLocalDate(input.nextDueDate);
    if (!due) {
      return {
        valid: false,
        errorVi: 'Ngày nhắc tiếp theo không hợp lệ.',
        errorEn: 'Invalid next due date.',
      };
    }
  }
  if (input.fileSize && input.fileSize > 5 * 1024 * 1024) {
    return {
      valid: false,
      errorVi: 'Tệp đính kèm vượt quá dung lượng tối đa 5MB.',
      errorEn: 'Attachment exceeds the 5MB maximum file size.',
    };
  }
  if (input.fileType && input.fileType.trim()) {
    const isAllowed =
      input.fileType.startsWith('image/') || input.fileType === 'application/pdf';
    if (!isAllowed) {
      return {
        valid: false,
        errorVi: 'Chỉ hỗ trợ đính kèm tệp hình ảnh hoặc PDF.',
        errorEn: 'Only image or PDF attachments are supported.',
      };
    }
  }
  return { valid: true };
}

/**
 * Computes human-readable age from birthDate if needed
 */
export function formatAgeWithDob(
  ageVi: string,
  ageEn: string | undefined,
  birthDate: string,
  lang: Language
): { ageLabel: string; dobLabel: string } {
  const ageLabel = lang === 'en' && ageEn ? ageEn : ageVi;
  const dobFormatted = formatDisplayDate(birthDate, lang);
  const dobLabel =
    lang === 'vi' ? `Sinh: ${dobFormatted}` : `DOB: ${dobFormatted}`;
  return { ageLabel, dobLabel };
}

export function translateSpecies(species: PetSpecies, lang: Language): string {
  if (lang === 'vi') return species;
  const map: Record<PetSpecies, string> = {
    Chó: 'Dog',
    Mèo: 'Cat',
    Thỏ: 'Rabbit',
    Hamster: 'Hamster',
    Chim: 'Bird',
    'Bò sát': 'Reptile',
    Khác: 'Other',
  };
  return map[species] || species;
}

export function translateGender(gender: Gender, lang: Language): string {
  if (lang === 'vi') return gender;
  return gender === 'Đực' ? 'Male' : 'Female';
}

// ============================================================================
// DETERMINISTIC SEED DATA FOR THE 6 EXISTING PETS
// ============================================================================

export const INITIAL_PET_PROFILES: PetProfileEntity[] = [
  {
    id: 'pet-1',
    name: 'Mây Mây',
    species: 'Mèo',
    breed: 'Mèo tai cụp Scottish Fold',
    breedEn: 'Scottish Fold',
    gender: 'Cái',
    birthDate: '2024-03-14',
    age: '2 tuổi',
    ageEn: '2 years old',
    weight: '3,8 kg',
    coatColor: 'Trắng kem ánh xám bạc',
    coatColorEn: 'Cream white & silver',
    allergies: 'Dị ứng hải sản có vỏ (tôm, cua)',
    allergiesEn: 'Shellfish allergy (shrimp, crab)',
    microchip: 'VN-900182736451',
    photo: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
    neutered: true,
    vaccinated: true,
    nextCheckupDate: offsetDaysIso(9),
    owner: 'Nguyễn Thảo Nhi',
  },
  {
    id: 'pet-2',
    name: 'Bơ',
    species: 'Chó',
    breed: 'Chó Golden Retriever',
    breedEn: 'Golden Retriever',
    gender: 'Đực',
    birthDate: '2024-09-20',
    age: '1,5 tuổi',
    ageEn: '1.5 years old',
    weight: '24,5 kg',
    coatColor: 'Vàng mật ong óng ả',
    coatColorEn: 'Golden honey',
    allergies: 'Không có',
    allergiesEn: 'None',
    microchip: 'VN-900294817263',
    photo: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
    neutered: true,
    vaccinated: true,
    nextCheckupDate: offsetDaysIso(22),
    owner: 'Trần Minh Quân',
  },
  {
    id: 'pet-3',
    name: 'Bông Gòn',
    species: 'Thỏ',
    breed: 'Thỏ tai cụp Holland Lop',
    breedEn: 'Holland Lop Rabbit',
    gender: 'Cái',
    birthDate: '2025-06-10',
    age: '9 tháng',
    ageEn: '9 months old',
    weight: '1,6 kg',
    coatColor: 'Trắng tuyết pha kem',
    coatColorEn: 'Snow white & cream',
    allergies: 'Nhạy cảm với cỏ linh lăng khô nhiều bụi',
    allergiesEn: 'Sensitive to dusty alfalfa hay',
    microchip: 'VN-900371829405',
    photo: '/assets/adoption/tuyet-nhung-1.jpg',
    neutered: true,
    vaccinated: true,
    nextCheckupDate: offsetDaysIso(14),
    owner: 'Lê Minh Châu',
  },
  {
    id: 'pet-4',
    name: 'Hạt Dẻ',
    species: 'Hamster',
    breed: 'Hamster Syrian Lông Vàng',
    breedEn: 'Golden Syrian Hamster',
    gender: 'Đực',
    birthDate: '2025-09-05',
    age: '6 tháng',
    ageEn: '6 months old',
    weight: '0,14 kg',
    coatColor: 'Nâu hạt dẻ bụng trắng',
    coatColorEn: 'Chestnut brown & white',
    allergies: 'Không có',
    allergiesEn: 'None',
    microchip: 'Chưa gắn vi mạch',
    photo: '/assets/adoption/banh-quy-1.jpg',
    neutered: false,
    vaccinated: false,
    nextCheckupDate: offsetDaysIso(35),
    owner: 'Vũ Hoàng Nam',
  },
  {
    id: 'pet-5',
    name: 'Rio',
    species: 'Chim',
    breed: 'Vẹt Cockatiel Má Hồng',
    breedEn: 'Lutino Cockatiel',
    gender: 'Đực',
    birthDate: '2025-02-18',
    age: '1 tuổi',
    ageEn: '1 year old',
    weight: '0,11 kg',
    coatColor: 'Vàng chanh má cam đỏ',
    coatColorEn: 'Lutino yellow & orange cheek',
    allergies: 'Không có',
    allergiesEn: 'None',
    microchip: 'VN-900519283746',
    photo: '/assets/adoption/kiwi-1.jpg',
    neutered: false,
    vaccinated: true,
    nextCheckupDate: offsetDaysIso(42),
    owner: 'Phạm Bảo Ngọc',
  },
  {
    id: 'pet-6',
    name: 'Mochi',
    species: 'Chó',
    breed: 'Chó Toy Poodle',
    breedEn: 'Toy Poodle',
    gender: 'Cái',
    birthDate: '2025-05-12',
    age: '10 tháng',
    ageEn: '10 months old',
    weight: '4,2 kg',
    coatColor: 'Nâu mơ (Apricot)',
    coatColorEn: 'Warm Apricot',
    allergies: 'Dị ứng đạm thịt bò',
    allergiesEn: 'Beef protein allergy',
    microchip: 'VN-900684729103',
    photo: '/src/assets/images/pet_spa_grooming_1793177484004.jpg',
    neutered: true,
    vaccinated: true,
    nextCheckupDate: offsetDaysIso(5),
    owner: 'Lê Hoài Anh',
  },
];

export const INITIAL_WEIGHT_LOGS: WeightLog[] = [
  // Mây Mây (pet-1): last 6 weights ending at 3.8 kg (+0.2 kg from 3.6 kg)
  { id: 'w-101', pet: 'pet-1', date: offsetDaysIso(-150), kg: 3.1 },
  { id: 'w-102', pet: 'pet-1', date: offsetDaysIso(-120), kg: 3.3 },
  { id: 'w-103', pet: 'pet-1', date: offsetDaysIso(-90), kg: 3.4 },
  { id: 'w-104', pet: 'pet-1', date: offsetDaysIso(-60), kg: 3.5 },
  { id: 'w-105', pet: 'pet-1', date: offsetDaysIso(-30), kg: 3.6 },
  { id: 'w-106', pet: 'pet-1', date: offsetDaysIso(-3), kg: 3.8 },

  // Bơ (pet-2): last 6 weights ending at 24.5 kg (+0.4 kg)
  { id: 'w-201', pet: 'pet-2', date: offsetDaysIso(-150), kg: 21.8 },
  { id: 'w-202', pet: 'pet-2', date: offsetDaysIso(-120), kg: 22.4 },
  { id: 'w-203', pet: 'pet-2', date: offsetDaysIso(-90), kg: 23.1 },
  { id: 'w-204', pet: 'pet-2', date: offsetDaysIso(-60), kg: 23.7 },
  { id: 'w-205', pet: 'pet-2', date: offsetDaysIso(-30), kg: 24.1 },
  { id: 'w-206', pet: 'pet-2', date: offsetDaysIso(-5), kg: 24.5 },

  // Bông Gòn (pet-3): last 6 weights ending at 1.6 kg (+0.1 kg)
  { id: 'w-301', pet: 'pet-3', date: offsetDaysIso(-150), kg: 1.1 },
  { id: 'w-302', pet: 'pet-3', date: offsetDaysIso(-120), kg: 1.2 },
  { id: 'w-303', pet: 'pet-3', date: offsetDaysIso(-90), kg: 1.3 },
  { id: 'w-304', pet: 'pet-3', date: offsetDaysIso(-60), kg: 1.4 },
  { id: 'w-305', pet: 'pet-3', date: offsetDaysIso(-30), kg: 1.5 },
  { id: 'w-306', pet: 'pet-3', date: offsetDaysIso(-4), kg: 1.6 },

  // Hạt Dẻ (pet-4)
  { id: 'w-401', pet: 'pet-4', date: offsetDaysIso(-120), kg: 0.10 },
  { id: 'w-402', pet: 'pet-4', date: offsetDaysIso(-90), kg: 0.11 },
  { id: 'w-403', pet: 'pet-4', date: offsetDaysIso(-60), kg: 0.12 },
  { id: 'w-404', pet: 'pet-4', date: offsetDaysIso(-40), kg: 0.13 },
  { id: 'w-405', pet: 'pet-4', date: offsetDaysIso(-20), kg: 0.13 },
  { id: 'w-406', pet: 'pet-4', date: offsetDaysIso(-2), kg: 0.14 },

  // Rio (pet-5)
  { id: 'w-501', pet: 'pet-5', date: offsetDaysIso(-140), kg: 0.09 },
  { id: 'w-502', pet: 'pet-5', date: offsetDaysIso(-110), kg: 0.09 },
  { id: 'w-503', pet: 'pet-5', date: offsetDaysIso(-80), kg: 0.10 },
  { id: 'w-504', pet: 'pet-5', date: offsetDaysIso(-50), kg: 0.10 },
  { id: 'w-505', pet: 'pet-5', date: offsetDaysIso(-25), kg: 0.10 },
  { id: 'w-506', pet: 'pet-5', date: offsetDaysIso(-6), kg: 0.11 },

  // Mochi (pet-6)
  { id: 'w-601', pet: 'pet-6', date: offsetDaysIso(-150), kg: 2.9 },
  { id: 'w-602', pet: 'pet-6', date: offsetDaysIso(-120), kg: 3.2 },
  { id: 'w-603', pet: 'pet-6', date: offsetDaysIso(-90), kg: 3.5 },
  { id: 'w-604', pet: 'pet-6', date: offsetDaysIso(-60), kg: 3.8 },
  { id: 'w-605', pet: 'pet-6', date: offsetDaysIso(-30), kg: 4.0 },
  { id: 'w-606', pet: 'pet-6', date: offsetDaysIso(-4), kg: 4.2 },
];

export const INITIAL_CARE_RECORDS: CareRecord[] = [
  // 1. Mây Mây (pet-1) — MANY records across years (7 records) + upcoming due in 9 days
  {
    id: 'care-101',
    pet: 'pet-1',
    type: 'vaccine',
    name: 'Vắc-xin 4 bệnh ở mèo (FVRCP mũi nhắc)',
    nameEn: 'Feline 4-in-1 FVRCP Booster',
    date: offsetDaysIso(-356),
    nextDueDate: offsetDaysIso(9),
    notes: 'Theo dõi nhiệt độ 24h sau tiêm, bé ăn ngủ tốt.',
    notesEn: 'Monitored temperature 24h post-vaccine, eating well.',
    attachmentName: 'chung-nhan-fvrcp-maymay.pdf',
    attachmentUrl: '#cert-fvrcp-maymay',
    status: 'upcoming',
  },
  {
    id: 'care-102',
    pet: 'pet-1',
    type: 'deworm',
    name: 'Tẩy giun & nhỏ gáy nội ngoại ký sinh Revolution',
    nameEn: 'Revolution Spot-on & Deworming',
    date: offsetDaysIso(-24),
    nextDueDate: offsetDaysIso(66),
    notes: 'Nhỏ gáy định kỳ mỗi quý, lông mượt không rụng.',
    notesEn: 'Quarterly spot-on protection, healthy coat.',
    status: 'done',
  },
  {
    id: 'care-103',
    pet: 'pet-1',
    type: 'spa',
    name: 'Spa thảo dược hoa cúc & vệ sinh tuyến hôi',
    nameEn: 'Chamomile Herbal Spa & Grooming',
    date: offsetDaysIso(-42),
    notes: 'Tắm thảo dược dịu nhẹ, cắt móng và vệ sinh tai sạch.',
    notesEn: 'Gentle herbal bath, nail trim, and ear cleaning.',
    status: 'done',
  },
  {
    id: 'care-104',
    pet: 'pet-1',
    type: 'checkup',
    name: 'Khám tổng quát & siêu âm ổ bụng định kỳ',
    nameEn: 'Comprehensive Wellness & Ultrasound Checkup',
    date: offsetDaysIso(-95),
    notes: 'Tim phổi ổn định, men gan thận trong giới hạn chuẩn.',
    notesEn: 'Heart and lungs normal, liver & kidney panel optimal.',
    attachmentName: 'ket-qua-sieu-am-maymay.pdf',
    attachmentUrl: '#ultrasound-maymay',
    status: 'done',
  },
  {
    id: 'care-105',
    pet: 'pet-1',
    type: 'vaccine',
    name: 'Vắc-xin phòng bệnh Dại (Rabies Defensor)',
    nameEn: 'Rabies Defensor Vaccination',
    date: '2025-05-10',
    notes: 'Không sưng chỗ tiêm, phản xạ nhanh nhẹn.',
    notesEn: 'No injection site swelling, active reflexes.',
    attachmentName: 'so-tiem-dai-2025.pdf',
    attachmentUrl: '#rabies-2025',
    status: 'done',
  },
  {
    id: 'care-106',
    pet: 'pet-1',
    type: 'deworm',
    name: 'Tẩy giun định kỳ Drontal Cat',
    nameEn: 'Drontal Cat Routine Deworming',
    date: '2025-02-14',
    notes: 'Uống 1 viên theo cân nặng 3.4 kg.',
    notesEn: '1 tablet dosed for 3.4 kg body weight.',
    status: 'done',
  },
  {
    id: 'care-107',
    pet: 'pet-1',
    type: 'checkup',
    name: 'Khám sức khỏe đầu đời & gắn vi mạch',
    nameEn: 'Initial Kitten Wellness Exam & Microchip',
    date: '2024-06-18',
    notes: 'Hoàn tất gắn vi mạch ISO chuẩn quốc tế.',
    notesEn: 'Completed ISO standard microchip implantation.',
    status: 'done',
  },

  // 2. Bơ (pet-2) — Has an OVERDUE item (overdue by 6 days) + 2 done records
  {
    id: 'care-201',
    pet: 'pet-2',
    type: 'vaccine',
    name: 'Vắc-xin phòng Ho cũi chó (Bordetella)',
    nameEn: 'Bordetella Kennel Cough Booster',
    date: offsetDaysIso(-371),
    nextDueDate: offsetDaysIso(-6),
    notes: 'Mũi nhắc hàng năm cần đặt lịch tiêm sớm.',
    notesEn: 'Annual booster currently overdue, book soon.',
    status: 'overdue',
  },
  {
    id: 'care-202',
    pet: 'pet-2',
    type: 'vaccine',
    name: 'Vắc-xin 7 bệnh ở chó (DHPPi-L)',
    nameEn: 'Canine 7-in-1 DHPPi-L Vaccine',
    date: offsetDaysIso(-120),
    nextDueDate: offsetDaysIso(245),
    notes: 'Đã tiêm tại phòng khám Animora Quận 1.',
    notesEn: 'Administered at Animora District 1 Clinic.',
    attachmentName: 'phieu-tiem-7benh-bo.pdf',
    attachmentUrl: '#dhppi-bo',
    status: 'done',
  },
  {
    id: 'care-203',
    pet: 'pet-2',
    type: 'deworm',
    name: 'Viên nhai tẩy giun & ve rận NexGard Spectra',
    nameEn: 'NexGard Spectra Chewable Protection',
    date: offsetDaysIso(-18),
    nextDueDate: offsetDaysIso(72),
    notes: 'Bé ăn hết viên nhai vị bò, tiêu hóa bình thường.',
    notesEn: 'Took chewable tablet well, normal digestion.',
    status: 'done',
  },

  // 3. Bông Gòn (pet-3) — 2 records, 1 upcoming in 14 days
  {
    id: 'care-301',
    pet: 'pet-3',
    type: 'checkup',
    name: 'Kiểm tra & mài răng cửa định kỳ cho thỏ',
    nameEn: 'Routine Rabbit Dental & Molar Checkup',
    date: offsetDaysIso(-76),
    nextDueDate: offsetDaysIso(14),
    notes: 'Răng hàm mọc đều, khuyến nghị ăn thêm cỏ Timothy.',
    notesEn: 'Even molar wear, continue high-fiber Timothy hay.',
    status: 'upcoming',
  },
  {
    id: 'care-302',
    pet: 'pet-3',
    type: 'vaccine',
    name: 'Vắc-xin phòng Xuất huyết Thỏ (RHDV2)',
    nameEn: 'Rabbit Hemorrhagic Disease RHDV2 Vaccine',
    date: offsetDaysIso(-140),
    nextDueDate: offsetDaysIso(225),
    notes: 'Đáp ứng miễn dịch tốt.',
    notesEn: 'Strong immune response.',
    status: 'done',
  },

  // 4. Hạt Dẻ (pet-4) — NO records at all (0 records) to test the empty state!

  // 5. Rio (pet-5) — 2 completed records, nothing due soon -> "Mọi thứ đang đúng lịch 🎉"
  {
    id: 'care-501',
    pet: 'pet-5',
    type: 'vaccine',
    name: 'Vắc-xin Polyomavirus cho vẹt cảnh',
    nameEn: 'Avian Polyomavirus Vaccination',
    date: offsetDaysIso(-80),
    nextDueDate: offsetDaysIso(285),
    notes: 'Lông cánh bóng khỏe, nhịp thở ổn định.',
    notesEn: 'Healthy plumage and clear respiration.',
    status: 'done',
  },
  {
    id: 'care-502',
    pet: 'pet-5',
    type: 'spa',
    name: 'Tỉa móng & dưỡng mỏ khoáng chất tự nhiên',
    nameEn: 'Avian Nail Trim & Beak Conditioning',
    date: offsetDaysIso(-30),
    nextDueDate: offsetDaysIso(90),
    notes: 'Mỏ đều đẹp, bé rất hợp tác với bác sĩ.',
    notesEn: 'Well-shaped beak, very calm during grooming.',
    status: 'done',
  },

  // 6. Mochi (pet-6) — 3 records, upcoming deworming due in 5 days
  {
    id: 'care-601',
    pet: 'pet-6',
    type: 'deworm',
    name: 'Tẩy giun tim định kỳ Heartgard Plus',
    nameEn: 'Heartgard Plus Heartworm Prevention',
    date: offsetDaysIso(-25),
    nextDueDate: offsetDaysIso(5),
    notes: 'Nhắc lịch uống viên tiếp theo vào tuần tới.',
    notesEn: 'Next monthly chewable due in 5 days.',
    status: 'upcoming',
  },
  {
    id: 'care-602',
    pet: 'pet-6',
    type: 'spa',
    name: 'Cắt tỉa tạo kiểu Teddy & tắm dưỡng yến mạch',
    nameEn: 'Teddy Styling Trim & Oatmeal Bath',
    date: offsetDaysIso(-20),
    notes: 'Dùng sữa tắm yến mạch hữu cơ cho da nhạy cảm.',
    notesEn: 'Used organic oatmeal shampoo for sensitive skin.',
    status: 'done',
  },
  {
    id: 'care-603',
    pet: 'pet-6',
    type: 'vaccine',
    name: 'Vắc-xin 5 bệnh Puppy & Phòng Dại mũi 1',
    nameEn: '5-in-1 Puppy & First Rabies Vaccine',
    date: offsetDaysIso(-110),
    nextDueDate: offsetDaysIso(255),
    notes: 'Hoàn tất phác đồ tiêm chủng cơ bản.',
    notesEn: 'Completed core puppy vaccination series.',
    attachmentName: 'chung-nhan-tiem-mochi.pdf',
    attachmentUrl: '#cert-mochi',
    status: 'done',
  },
];
