import { register } from '../api/apiUser';
import type { User } from '../types/User';
import { useState } from 'react';
import { AxiosError } from 'axios';

const useAuthApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const createUser = async (user: User) => {
    setIsLoading(true);
    try {
      const res = await register(user);
      setCreatedUser(res);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      if (err instanceof AxiosError) {
        setError(err.response?.data.msg);
      } else {
        setError(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isError, error, createUser, createdUser };
};

export default useAuthApi;
