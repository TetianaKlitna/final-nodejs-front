import { register, login, logout, type AuthResponse } from '../api/apiUser';
import type { User } from '../types/User';
import useRequest from './useRequest';

const useAuthApi = () => {
  const { run, isLoading, isError, error } = useRequest();

  const createUser = (user: User) => run<AuthResponse>(() => register(user));
  const loginUser = (user: User) => run<AuthResponse>(() => login(user));
  const logoutUser = () => run<boolean>(() => logout());

  return { isLoading, isError, error, createUser, loginUser, logoutUser };
};

export default useAuthApi;
