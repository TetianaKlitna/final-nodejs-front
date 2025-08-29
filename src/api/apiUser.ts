import { apiCall } from './api';
import type { User } from '../types/User';

const signUp = async (user: User) => {
  const res = await apiCall<User>('post', '/auth/signup', user);
  return res;
};

const signIn = () => {};

export { signUp, signIn };
