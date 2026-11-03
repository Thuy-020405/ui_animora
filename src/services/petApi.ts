import { api } from './apiClient';
import { Pet } from '@/types';
import { mockPets } from './mock';

export async function fetchPets(): Promise<Pet[]> {
  try {
    return await api<Pet[]>('/pets');
  } catch {
    return mockPets;
  }
}
