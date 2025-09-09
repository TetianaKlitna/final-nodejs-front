import { register, type AuthResponse } from '../api/apiUser';
import type { User } from '../types/User';
import { useState } from 'react';
import { AxiosError } from 'axios';

const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const createUser = async (user: User): Promise<AuthResponse> => {
    setIsLoading(true);
    try {
      const res = await register(user);
      setIsError(false);
      return res;
    } catch (err) {
      setIsError(true);
      if (err instanceof AxiosError) {
        setError(err.response?.data.msg);
      } else {
        setError(String(err));
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, error, createUser };
};

export default useAuthApi;
