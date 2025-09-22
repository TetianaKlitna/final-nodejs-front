import { apiCall } from './api';
import type { User, UserDTO } from '../types';

export type AuthResponse = {
  accessToken: string;
  user: UserDTO;
};

export const register = async (user: User): Promise<AuthResponse> => {
  const res = await apiCall<AuthResponse>('post', '/auth/register', user);
  return res;
};

export const login = async (user: User): Promise<AuthResponse> => {
  const res = await apiCall<AuthResponse>('post', '/auth/login', user);
  return res;
};

export const logout = async (): Promise<boolean> => {
  const res = await apiCall<{ success: boolean }>('post', 'auth/logout');
  return res.success;
};
