import { apiCall } from './api';
import type { User } from '../types/User';

const register = async (user: User) => {
  const res = await apiCall<User>('post', '/auth/register', user);
  return res;
};

const login = () => {};

export { register, login };
