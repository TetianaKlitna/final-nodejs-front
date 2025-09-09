import { apiCall } from './api';
import type { User } from '../types/User';

export type AuthResponse = {
  user: User;
  token: string;
};

export const register = async (user: User): Promise<AuthResponse> => {
  const res = await apiCall<AuthResponse>('post', '/auth/register', user);
  return res;
};
