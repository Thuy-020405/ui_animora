import { api } from './apiClient';
import { Product } from '@/types';
import { mockProducts } from './mock';

export async function fetchProducts(): Promise<Product[]> {
  try {
    return await api<Product[]>('/products');
  } catch {
    return mockProducts;
  }
}
