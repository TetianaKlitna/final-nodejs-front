import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  type AuthResponse,
} from '../api/apiUser';
import type { User } from '../types/User';
import useRequest from './useRequest';

const useAuthApi = () => {
  const { run, isLoading, isError, error } = useRequest();

  const createUser = (user: User) => run<boolean>(() => register(user));
  const loginUser = (user: User) => run<AuthResponse>(() => login(user));
  const logoutUser = () => run<boolean>(() => logout());
  const forgotPasswordUser = (email: string) =>
    run<boolean>(() => forgotPassword(email));
  const resetPasswordUser = (
    token: string,
    email: string,
    newPassword: string
  ) => run<boolean>(() => resetPassword(token, email, newPassword));

  return {
    isLoading,
    isError,
    error,
    createUser,
    loginUser,
    logoutUser,
    forgotPasswordUser,
    resetPasswordUser,
  };
};

export default useAuthApi;
