import { Pet, Vaccination, AdoptionPet, Product } from '../types';
import { ADOPTION_PETS_DATA } from './adoptionData';
import { SHOP_PRODUCTS } from './shopData';

export const initialPets: Pet[] = [
  {
    id: 'pet-1',
    name: 'Mây Mây',
    species: 'Mèo',
    breed: 'Scottish Fold',
    gender: 'Cái',
    age: '2 tuổi',
    weight: '3.8 kg',
    photo: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
    nextCheckupDate: '15/11/2026',
    owner: 'Nguyễn Thảo Nhi',
  },
  {
    id: 'pet-2',
    name: 'Bơ',
    species: 'Chó',
    breed: 'Golden Retriever',
    gender: 'Đực',
    age: '1.5 tuổi',
    weight: '24.5 kg',
    photo: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
    nextCheckupDate: '02/12/2026',
    owner: 'Trần Minh Quân',
  },
  {
    id: 'pet-3',
    name: 'Bông Gòn',
    species: 'Thỏ',
    breed: 'Thỏ Holland Lop',
    gender: 'Cái',
    age: '9 tháng',
    weight: '1.6 kg',
    photo: '/assets/adoption/tuyet-nhung-1.jpg',
    nextCheckupDate: '18/11/2026',
    owner: 'Lê Minh Châu',
  },
  {
    id: 'pet-4',
    name: 'Hạt Dẻ',
    species: 'Hamster',
    breed: 'Golden Syrian Hamster',
    gender: 'Đực',
    age: '6 tháng',
    weight: '0.14 kg',
    photo: '/assets/adoption/banh-quy-1.jpg',
    nextCheckupDate: '25/11/2026',
    owner: 'Vũ Hoàng Nam',
  },
  {
    id: 'pet-5',
    name: 'Rio',
    species: 'Chim',
    breed: 'Vẹt Cockatiel Má Hồng',
    gender: 'Đực',
    age: '1 tuổi',
    weight: '0.11 kg',
    photo: '/assets/adoption/kiwi-1.jpg',
    nextCheckupDate: '10/12/2026',
    owner: 'Phạm Bảo Ngọc',
  },
  {
    id: 'pet-6',
    name: 'Mochi',
    species: 'Chó',
    breed: 'Toy Poodle',
    gender: 'Cái',
    age: '10 tháng',
    weight: '4.2 kg',
    photo: '/src/assets/images/pet_spa_grooming_1793177484004.jpg',
    nextCheckupDate: '20/11/2026',
    owner: 'Lê Hoài Anh',
  },
];

export const initialVaccinations: Vaccination[] = [
  // Mây Mây (Mèo)
  { id: 'vac-1', petId: 'pet-1', vaccineName: 'Dại (Rabies Virus)', status: 'vaccinated', date: '10/05/2026' },
  { id: 'vac-2', petId: 'pet-1', vaccineName: '4 Bệnh ở mèo (FVRCP)', status: 'vaccinated', date: '12/06/2026' },
  { id: 'vac-3', petId: 'pet-1', vaccineName: 'Xổ giun định kỳ Q4', status: 'due_soon', date: '20/11/2026' },
  
  // Bơ (Chó)
  { id: 'vac-4', petId: 'pet-2', vaccineName: '7 Bệnh ở chó (DHPP)', status: 'vaccinated', date: '01/04/2026' },
  { id: 'vac-5', petId: 'pet-2', vaccineName: 'Bệnh Dại (Rabies)', status: 'vaccinated', date: '15/04/2026' },
  { id: 'vac-6', petId: 'pet-2', vaccineName: 'Viêm phế quản (Bordetella)', status: 'due_soon', date: '10/11/2026' },

  // Bông Gòn (Thỏ)
  { id: 'vac-7', petId: 'pet-3', vaccineName: 'Vắc-xin Xuất huyết Thỏ (RHDV)', status: 'vaccinated', date: '14/06/2026' },
  { id: 'vac-8', petId: 'pet-3', vaccineName: 'Kiểm tra & Mài răng định kỳ', status: 'due_soon', date: '18/11/2026' },

  // Hạt Dẻ (Hamster)
  { id: 'vac-9', petId: 'pet-4', vaccineName: 'Khám tổng quát & Kiểm tra túi má', status: 'vaccinated', date: '02/09/2026' },
  { id: 'vac-10', petId: 'pet-4', vaccineName: 'Chăm sóc da lông & Ký sinh trùng', status: 'due_soon', date: '25/11/2026' },

  // Rio (Chim / Vẹt)
  { id: 'vac-11', petId: 'pet-5', vaccineName: 'Vắc-xin Polyomavirus ở vẹt', status: 'vaccinated', date: '19/07/2026' },
  { id: 'vac-12', petId: 'pet-5', vaccineName: 'Tỉa móng & Kiểm tra mỏ định kỳ', status: 'due_soon', date: '10/12/2026' },

  // Mochi (Chó)
  { id: 'vac-13', petId: 'pet-6', vaccineName: '5 Bệnh ở chó puppy', status: 'vaccinated', date: '05/08/2026' },
  { id: 'vac-14', petId: 'pet-6', vaccineName: 'Bệnh Dại (Rabies)', status: 'not_yet', date: '01/12/2026' },
];

export const initialAdoptionPets: AdoptionPet[] = ADOPTION_PETS_DATA;

export const initialProducts: Product[] = SHOP_PRODUCTS;




