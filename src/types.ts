export type Language = 'vi' | 'en';

export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'booking'
  | 'my-bookings'
  | 'adopt'
  | 'shop'
  | 'cart'
  | 'checkout'
  | 'pet-profiles'
  | 'login'
  | 'register'
  | 'account';

export type PetSpecies = 'Chó' | 'Mèo' | 'Thỏ' | 'Hamster' | 'Chim' | 'Bò sát' | 'Khác';
export type Gender = 'Đực' | 'Cái';

export interface Pet {
  id: string;
  name: string;
  species: PetSpecies;
  breed: string;
  gender: Gender;
  age: string;
  weight: string;
  photo: string;
  nextCheckupDate: string;
  owner: string;
}

export type VaccinationStatus = 'vaccinated' | 'due_soon' | 'not_yet';

export interface Vaccination {
  id: string;
  petId: string;
  vaccineName: string;
  status: VaccinationStatus;
  date: string;
}

export interface AdoptionVaccinationItem {
  id: string;
  nameVi: string;
  nameEn: string;
  status: VaccinationStatus;
  date: string;
}

export interface AdoptionPet {
  id: string;
  slug: string;
  name: string;
  species: PetSpecies;
  breed: string;
  breedEn?: string;
  age: string;
  ageEn?: string;
  ageMonths?: number;
  gender: Gender;
  weight?: string;
  color?: string;
  colorEn?: string;
  area?: string;
  areaEn?: string;
  distanceKm?: number;
  personality: string;
  personalityEn?: string;
  personalityTagsVi?: string[];
  personalityTagsEn?: string[];
  photo: string;
  photos?: string[];
  status: 'waiting' | 'adopted' | 'available' | 'pending';
  vaccinated?: boolean;
  neutered?: boolean;
  microchip?: string;
  goodWithVi?: string[];
  goodWithEn?: string[];
  lastCheckupDate?: string;
  vaccinations?: AdoptionVaccinationItem[];
  tags: string[];
  story: string;
  storyEn?: string;
  createdAt?: string;
}

export type ProductCategory = 'food' | 'toys' | 'accessories' | 'care';

export type ShopPetGroup = 'dog' | 'cat' | 'rabbit_rodent' | 'bird' | 'fish_reptile';

export type ProductBadgeType = 'sale' | 'new' | 'bestseller' | 'out_of_stock';

export interface ProductSpecOption {
  labelVi: string;
  labelEn: string;
  price: number;
  oldPrice?: number;
}

export interface Product {
  id: string;
  slug?: string;
  name: string;
  nameEn?: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  category: ProductCategory;
  petTypes?: ShopPetGroup[];
  brand?: string;
  spec?: string;
  specEn?: string;
  specOptions?: ProductSpecOption[];
  image: string;
  images?: string[];
  badges?: ProductBadgeType[];
  stock?: number;
  description: string;
  descriptionEn?: string;
  ingredientsVi?: string;
  ingredientsEn?: string;
  usageVi?: string;
  usageEn?: string;
  rating: number;
  reviewCount?: number;
  createdAtOrder?: number;
  recommendedAges?: ('baby' | 'adult' | 'senior')[];
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  petInfoVi: string;
  petInfoEn: string;
  stars: number;
  textVi: string;
  textEn: string;
  date: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
  selectedSpec?: string;
  unitPriceAtAdd?: number;
}

export type BookingPreferredContact = 'phone' | 'zalo' | 'email';

export type BookingWeightRangeId = 'under_5' | '5_to_10' | '10_to_20' | 'over_20';

export type BookingPetTypeId = 'Chó' | 'Mèo' | 'Thỏ & chuột' | 'Chim' | 'Khác';

export type BookingStatus =
  | 'Mới'
  | 'Đã xác nhận'
  | 'Hoàn thành'
  | 'Đã hủy'
  | 'Không đến';

export interface BookingRescheduleEntry {
  fromDate: string;
  fromTimeSlot?: string;
  toDate: string;
  toTimeSlot?: string;
  changedAt: string;
}

export interface Booking {
  id: string;
  code?: string;
  userId?: string | null;
  serviceSlug?: string;
  service: string;
  petType: string;
  petName?: string;
  petBreed?: string;
  weightRange?: BookingWeightRangeId | string;
  date: string;
  timeSlot?: string;
  fullName: string;
  phone: string;
  email?: string;
  preferredContact?: BookingPreferredContact;
  note?: string;
  vaccinatedConfirmed?: boolean;
  status?: BookingStatus;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  rescheduledFrom?: BookingRescheduleEntry[];
  internalNote?: string;
  addedToPetRecordId?: string;
  createdAt: string;
}

export interface AdoptionRequest {
  id: string;
  requestCode?: string;
  petId: string;
  petSlug?: string;
  petName: string;
  applicantName: string;
  phone: string;
  email: string;
  area?: string;
  preferredContact?: 'phone' | 'zalo' | 'email';
  bestTime?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  hadPetBefore?: 'yes' | 'no' | boolean;
  housingType?: 'house' | 'apartment' | 'rented' | 'other';
  landlordPermission?: 'yes' | 'not_needed' | 'in_progress';
  householdSize?: number;
  hasYoungChildren?: boolean;
  hasOtherPets?: boolean;
  otherPetsDetail?: string;
  hoursAtHome?: 'full_day' | 'evening_only' | 'flexible' | 'often_away';
  monthlyBudget?: 'under_1m' | '1m_to_2m' | '2m_to_4m' | 'over_4m';
  visitConsent?: boolean;
  livingCondition?: 'house' | 'apartment' | 'other';
  notes: string;
  agreedCommitment?: boolean;
  commitmentsAccepted?: {
    lifelongCare: boolean;
    vaccinations: boolean;
    updatePhotos: boolean;
    noAbandonment: boolean;
  };
  status?: 'pending' | 'reviewing' | 'approved' | 'completed';
  createdAt: string;
}

export type AuthMode = 'login' | 'register' | 'forgot-password' | 'account';

export interface ShippingAddress {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  addressLine: string;
  isDefault: boolean;
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: 'owner' | 'vet' | 'admin';
  createdAt: string;
  addresses: ShippingAddress[];
}

