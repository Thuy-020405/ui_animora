import { AdoptionPet, PetSpecies, Product, ProductCategory } from '../types';

export interface ServiceEstimateInput {
  serviceId: 'checkup' | 'spa' | 'training' | 'boarding' | 'dental';
  species: PetSpecies;
  weightKg: number;
  addOns: string[];
  nights?: number;
}

export interface ServiceEstimateResult {
  basePrice: number;
  weightMultiplier: number;
  addOnTotal: number;
  totalPrice: number;
  estimatedDurationMins: number;
}

const SERVICE_BASE_PRICES: Record<ServiceEstimateInput['serviceId'], number> = {
  checkup: 590000,
  spa: 490000,
  training: 690000,
  boarding: 390000,
  dental: 550000,
};

const SERVICE_BASE_DURATIONS: Record<ServiceEstimateInput['serviceId'], number> = {
  checkup: 45,
  spa: 75,
  training: 60,
  boarding: 1440,
  dental: 50,
};

export const ADDON_PRICES: Record<string, { price: number; durationMins: number }> = {
  herbal_bath: { price: 120000, durationMins: 20 },
  ultrasonic_dental: { price: 180000, durationMins: 25 },
  breed_styling: { price: 150000, durationMins: 30 },
  home_pickup: { price: 100000, durationMins: 0 },
};

export function estimateServiceCost(input: ServiceEstimateInput): ServiceEstimateResult {
  const safeWeight = Number.isFinite(input.weightKg) && input.weightKg > 0 ? input.weightKg : 3;
  const base = SERVICE_BASE_PRICES[input.serviceId] ?? 490000;

  let weightMultiplier = 1.0;
  if (input.species === 'Hamster' || input.species === 'Chim') {
    weightMultiplier = 0.85;
  } else if (safeWeight > 20) {
    weightMultiplier = 1.35;
  } else if (safeWeight > 10) {
    weightMultiplier = 1.2;
  } else if (safeWeight > 5) {
    weightMultiplier = 1.1;
  }

  const nightsCount =
    input.serviceId === 'boarding'
      ? Math.max(1, Math.min(30, Math.round(input.nights || 1)))
      : 1;

  const adjustedBase = Math.round((base * weightMultiplier * nightsCount) / 1000) * 1000;

  let addOnTotal = 0;
  let addOnDuration = 0;
  for (const addOnId of input.addOns) {
    const info = ADDON_PRICES[addOnId];
    if (info) {
      addOnTotal += info.price;
      addOnDuration += info.durationMins;
    }
  }

  const totalPrice = adjustedBase + addOnTotal;
  const baseDuration = SERVICE_BASE_DURATIONS[input.serviceId] ?? 60;
  const estimatedDurationMins =
    input.serviceId === 'boarding'
      ? nightsCount * 24 * 60
      : baseDuration + addOnDuration + (safeWeight > 15 ? 15 : 0);

  return {
    basePrice: adjustedBase,
    weightMultiplier,
    addOnTotal,
    totalPrice,
    estimatedDurationMins,
  };
}

export interface AdoptionMatchPreferences {
  preferredSpecies: 'All' | PetSpecies;
  livingSpace: 'apartment' | 'house_yard';
  dailyTime: 'compact' | 'moderate' | 'plenty';
  experience: 'first_time' | 'experienced';
}

export interface AdoptionMatchResult {
  score: number;
  matchReasonsVi: string[];
  matchReasonsEn: string[];
}

export function calculateAdoptionMatchScore(
  pet: AdoptionPet,
  prefs: AdoptionMatchPreferences
): AdoptionMatchResult {
  let score = 78;
  const reasonsVi: string[] = [];
  const reasonsEn: string[] = [];

  // Species preference
  if (prefs.preferredSpecies === 'All' || pet.species === prefs.preferredSpecies) {
    score += 10;
    reasonsVi.push(`Đúng loài ${pet.species} bạn yêu thích`);
    reasonsEn.push(`Matches your preferred species (${pet.species})`);
  } else {
    score -= 18;
  }

  // Living space suitability
  const apartmentFriendlySpecies: PetSpecies[] = ['Mèo', 'Thỏ', 'Hamster', 'Chim'];
  const isSmallDog =
    pet.species === 'Chó' &&
    (pet.breed.toLowerCase().includes('poodle') ||
      pet.breed.toLowerCase().includes('bulldog') ||
      pet.breed.toLowerCase().includes('corgi'));

  if (prefs.livingSpace === 'apartment') {
    if (apartmentFriendlySpecies.includes(pet.species) || isSmallDog) {
      score += 7;
      reasonsVi.push('Thích nghi rất tốt với không gian căn hộ');
      reasonsEn.push('Thrives in apartment living spaces');
    } else {
      score -= 8;
    }
  } else {
    score += 6;
    reasonsVi.push('Phù hợp tuyệt vời với nhà có không gian rộng');
    reasonsEn.push('Great fit for a home with extra space');
  }

  // Daily time suitability
  if (prefs.dailyTime === 'compact') {
    if (pet.species === 'Hamster' || pet.species === 'Mèo' || pet.species === 'Thỏ') {
      score += 5;
      reasonsVi.push('Lịch sinh hoạt nhẹ nhàng, dễ chăm sóc khi bận rộn');
      reasonsEn.push('Gentle routine suitable for busy schedules');
    } else if (pet.species === 'Chó') {
      score -= 5;
    }
  } else {
    score += 4;
    reasonsVi.push('Tương tác gắn kết cao mỗi ngày');
    reasonsEn.push('Loves daily interactive bonding');
  }

  // Experience level
  if (prefs.experience === 'first_time') {
    if (pet.tags.some((t) => t.toLowerCase().includes('thân thiện') || t.toLowerCase().includes('hiền') || t.toLowerCase().includes('dễ'))) {
      score += 4;
      reasonsVi.push('Tính cách hiền lành, phù hợp người mới nuôi lần đầu');
      reasonsEn.push('Friendly temperament ideal for first-time pet parents');
    }
  } else {
    score += 3;
  }

  const clampedScore = Math.max(55, Math.min(99, score));
  return {
    score: clampedScore,
    matchReasonsVi: reasonsVi.slice(0, 2),
    matchReasonsEn: reasonsEn.slice(0, 2),
  };
}

export interface ProductFilterOptions {
  category: ProductCategory | 'all';
  searchQuery: string;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating';
  maxPrice?: number;
}

export function filterAndSortProducts(
  products: Product[],
  options: ProductFilterOptions
): Product[] {
  const query = options.searchQuery.trim().toLowerCase();

  const filtered = products.filter((prod) => {
    if (options.category !== 'all' && prod.category !== options.category) {
      return false;
    }
    if (typeof options.maxPrice === 'number' && prod.price > options.maxPrice) {
      return false;
    }
    if (query) {
      const hay = `${prod.name} ${prod.description} ${prod.category}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    return true;
  });

  const sorted = [...filtered];
  if (options.sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (options.sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (options.sortBy === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating || a.price - b.price);
  }

  return sorted;
}

export interface PetNutritionInput {
  species: PetSpecies;
  weightStr: string;
  activityLevel: 'low' | 'normal' | 'high';
}

export interface PetNutritionResult {
  weightKg: number;
  dailyCaloriesKcal: number;
  dailyWaterMl: number;
  recommendedMealsPerDay: number;
  careTipVi: string;
  careTipEn: string;
}

export function parsePetWeightKg(weightStr: string): number {
  const match = weightStr.replace(',', '.').match(/(\d+(\.\d+)?)/);
  if (!match) return 3.5;
  const val = parseFloat(match[1]);
  return Number.isFinite(val) && val > 0 ? val : 3.5;
}

export function calculateDailyPetNutrition(input: PetNutritionInput): PetNutritionResult {
  const weightKg = parsePetWeightKg(input.weightStr);

  // Resting Energy Requirement (RER) = 70 * (weightKg ^ 0.75)
  const rer = 70 * Math.pow(weightKg, 0.75);

  const activityMultipliers: Record<PetNutritionInput['activityLevel'], number> = {
    low: 1.2,
    normal: 1.5,
    high: 1.85,
  };

  const speciesFactor =
    input.species === 'Mèo'
      ? 0.9
      : input.species === 'Thỏ'
      ? 0.85
      : input.species === 'Hamster' || input.species === 'Chim'
      ? 1.1
      : 1.0;

  const dailyCaloriesKcal = Math.max(
    18,
    Math.round(rer * activityMultipliers[input.activityLevel] * speciesFactor)
  );

  // Typical daily hydration ~ 55-65 ml per kg body weight
  const baseWaterPerKg = input.activityLevel === 'high' ? 68 : input.activityLevel === 'normal' ? 58 : 50;
  const dailyWaterMl = Math.max(15, Math.round(weightKg * baseWaterPerKg));

  let recommendedMealsPerDay = 2;
  let careTipVi = 'Chia đều khẩu phần sáng - tối và luôn để sẵn nước lọc tươi mới.';
  let careTipEn = 'Split meals evenly between morning and evening with fresh filtered water.';

  if (input.species === 'Thỏ') {
    recommendedMealsPerDay = 3;
    careTipVi = '80% khẩu phần cần là cỏ Timothy khô giúp mài răng tự nhiên và ổn định nhu động ruột.';
    careTipEn = '80% of diet should be fresh Timothy hay for natural dental wear and gut motility.';
  } else if (input.species === 'Hamster') {
    recommendedMealsPerDay = 2;
    careTipVi = 'Cho ăn vào chiều tối theo nhịp sinh học và kiểm tra túi má định kỳ hàng tuần.';
    careTipEn = 'Feed in the early evening matching nocturnal rhythm and check cheek pouches weekly.';
  } else if (input.species === 'Chim') {
    recommendedMealsPerDay = 3;
    careTipVi = 'Kết hợp hạt ngũ cốc sạch cùng rau xanh, trái cây tươi cắt nhỏ mỗi sáng.';
    careTipEn = 'Combine clean seed mix with fresh leafy greens and diced fruit every morning.';
  } else if (input.species === 'Mèo') {
    recommendedMealsPerDay = 3;
    careTipVi = 'Kết hợp hạt hữu cơ và pate cấp ẩm để bảo vệ hệ tiết niệu và thận cho mèo.';
    careTipEn = 'Combine organic kibble with hydrating wet food to support feline urinary and kidney health.';
  } else if (input.species === 'Chó') {
    recommendedMealsPerDay = weightKg < 6 ? 3 : 2;
    careTipVi = 'Bổ sung vận động 30-45 phút mỗi ngày và hạn chế vận động mạnh ngay sau bữa ăn.';
    careTipEn = 'Include 30-45 mins of daily exercise and avoid heavy activity right after meals.';
  }

  return {
    weightKg,
    dailyCaloriesKcal,
    dailyWaterMl,
    recommendedMealsPerDay,
    careTipVi,
    careTipEn,
  };
}

export interface LanguageToggleMeta {
  currentCode: 'VI' | 'EN';
  targetCode: 'VI' | 'EN';
  currentName: string;
  targetName: string;
  shortLabel: string;
  tooltipStatus: string;
  tooltipAction: string;
  ariaLabel: string;
}

export function getLanguageToggleMeta(lang: 'vi' | 'en'): LanguageToggleMeta {
  if (lang === 'vi') {
    return {
      currentCode: 'VI',
      targetCode: 'EN',
      currentName: 'Tiếng Việt',
      targetName: 'English',
      shortLabel: 'Ngôn ngữ: VI',
      tooltipStatus: 'Đang dùng: Tiếng Việt (VI)',
      tooltipAction: 'Nhấn để chuyển sang English (EN)',
      ariaLabel: 'Đang dùng Tiếng Việt (VI). Nhấn để chuyển sang English (EN)',
    };
  }
  return {
    currentCode: 'EN',
    targetCode: 'VI',
    currentName: 'English',
    targetName: 'Tiếng Việt',
    shortLabel: 'Lang: EN',
    tooltipStatus: 'Current: English (EN)',
    tooltipAction: 'Click to switch to Tiếng Việt (VI)',
    ariaLabel: 'Current language: English (EN). Click to switch to Tiếng Việt (VI)',
  };
}

export interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4;
  level: 'weak' | 'medium' | 'strong';
  labelVi: string;
  labelEn: string;
}

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const pwd = password || '';
  if (pwd.length === 0) {
    return { score: 0, level: 'weak', labelVi: 'Chưa nhập', labelEn: 'Empty' };
  }

  let score = 0;
  if (pwd.length >= 6) score += 1;
  if (pwd.length >= 8) score += 1;
  if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
  if (/\d/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score += 1;

  const clamped = Math.max(1, Math.min(4, score)) as 1 | 2 | 3 | 4;
  if (clamped <= 2) {
    return { score: clamped, level: 'weak', labelVi: 'Yếu', labelEn: 'Weak' };
  }
  if (clamped === 3) {
    return { score: clamped, level: 'medium', labelVi: 'Khá mạnh', labelEn: 'Good' };
  }
  return { score: clamped, level: 'strong', labelVi: 'Rất mạnh', labelEn: 'Strong' };
}

export interface AuthValidationResult {
  isValid: boolean;
  field?: 'fullName' | 'email' | 'phone' | 'identifier' | 'password' | 'confirmPassword' | 'terms';
  errorVi?: string;
  errorEn?: string;
}

export function isValidEmailOrPhone(identifier: string): boolean {
  const trimmed = identifier.trim();
  if (!trimmed) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(\+?84|0)\d{8,10}$/;
  return emailRegex.test(trimmed) || phoneRegex.test(trimmed);
}

export function validateLoginInput(identifier: string, password: string): AuthValidationResult {
  const idTrimmed = identifier.trim();
  if (!idTrimmed) {
    return {
      isValid: false,
      field: 'identifier',
      errorVi: 'Vui lòng nhập Email hoặc Số điện thoại.',
      errorEn: 'Please enter your Email or Phone number.',
    };
  }
  if (!isValidEmailOrPhone(idTrimmed)) {
    return {
      isValid: false,
      field: 'identifier',
      errorVi: 'Email hoặc Số điện thoại không đúng định dạng.',
      errorEn: 'Invalid Email or Phone number format.',
    };
  }
  if (!password || password.length < 6) {
    return {
      isValid: false,
      field: 'password',
      errorVi: 'Mật khẩu phải có ít nhất 6 ký tự.',
      errorEn: 'Password must be at least 6 characters.',
    };
  }
  return { isValid: true };
}

export interface RegisterFormInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreedTerms: boolean;
}

export function validateRegisterInput(input: RegisterFormInput): AuthValidationResult {
  const nameTrimmed = input.fullName.trim();
  const emailTrimmed = input.email.trim();
  const phoneTrimmed = input.phone.trim();

  if (nameTrimmed.length < 2) {
    return {
      isValid: false,
      field: 'fullName',
      errorVi: 'Vui lòng nhập họ và tên đầy đủ (tối thiểu 2 ký tự).',
      errorEn: 'Please enter your full name (at least 2 characters).',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrimmed)) {
    return {
      isValid: false,
      field: 'email',
      errorVi: 'Địa chỉ Email không hợp lệ.',
      errorEn: 'Please enter a valid Email address.',
    };
  }

  const phoneRegex = /^(\+?84|0)\d{8,10}$/;
  if (!phoneRegex.test(phoneTrimmed)) {
    return {
      isValid: false,
      field: 'phone',
      errorVi: 'Số điện thoại không hợp lệ (ví dụ: 0901234567).',
      errorEn: 'Please enter a valid phone number (e.g., 0901234567).',
    };
  }

  if (!input.password || input.password.length < 6) {
    return {
      isValid: false,
      field: 'password',
      errorVi: 'Mật khẩu phải có từ 6 ký tự trở lên.',
      errorEn: 'Password must be at least 6 characters long.',
    };
  }

  if (input.password !== input.confirmPassword) {
    return {
      isValid: false,
      field: 'confirmPassword',
      errorVi: 'Mật khẩu xác nhận không khớp.',
      errorEn: 'Confirmation password does not match.',
    };
  }

  if (!input.agreedTerms) {
    return {
      isValid: false,
      field: 'terms',
      errorVi: 'Vui lòng đồng ý với Điều khoản dịch vụ & Chính sách bảo mật.',
      errorEn: 'Please agree to the Terms of Service & Privacy Policy.',
    };
  }

  return { isValid: true };
}


