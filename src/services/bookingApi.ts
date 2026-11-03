import { api } from './apiClient';
import { Booking } from '@/types';
import { mockPets } from './mock';

export async function fetchBookings(): Promise<Booking[]> {
  try {
    return await api<Booking[]>('/bookings');
  } catch {
    // Fallback to mock data while backend is not ready
    return [];
  }
}

export async function createBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
  try {
    return await api<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
    });
  } catch {
    return {
      ...booking,
      id: 'bk-' + Date.now(),
    } as Booking;
  }
}
