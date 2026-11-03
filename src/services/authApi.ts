import { api } from './apiClient';
import { UserAccount } from '@/types';

export async function loginUser(emailOrPhone: string, passwordHash: string): Promise<UserAccount> {
  return api<UserAccount>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ emailOrPhone, passwordHash }),
  });
}
