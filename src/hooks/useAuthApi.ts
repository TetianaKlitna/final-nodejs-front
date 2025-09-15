import { register, login, logout, type AuthResponse } from '../api/apiUser';
import type { User } from '../types/User';
import { useState } from 'react';
import { AxiosError } from 'axios';

const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const handleRequest = async <T>(fn: () => Promise<T>): Promise<T> => {
    setIsLoading(true);
    try {
      const res = await fn();
      setIsError(false);
      return res;
    } catch (err) {
      setIsError(true);
      if (err instanceof AxiosError) {
        setError(err.response?.data.msg || 'Unknown error');
      } else {
        setError(String(err));
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = (user: User) =>
    handleRequest<AuthResponse>(() => register(user));

  const loginUser = (user: User) =>
    handleRequest<AuthResponse>(() => login(user));

  const logoutUser = () => handleRequest<boolean>(() => logout());

  return { isLoading, isError, error, createUser, loginUser, logoutUser };
};

export default useAuthApi;
