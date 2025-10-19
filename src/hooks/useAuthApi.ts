import {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
  refreshData,
  type AuthResponse
} from '../api/apiUser'
import type { User, UserDTO } from '../types'
import useRequest from './useRequest'

const useAuthApi = () => {
  const { run, isLoading, isError, error } = useRequest()

  const createUser = (user: User) => run<boolean>(() => register(user))
  const loginUser = (user: User) => run<AuthResponse>(() => login(user))
  const logoutUser = () => run<boolean>(() => logout())
  const getCurrentUser = () => run<UserDTO>(() => getUser())
  const forgotPasswordUser = (email: string) =>
    run<boolean>(() => forgotPassword(email))
  const resetPasswordUser = (
    token: string,
    email: string,
    newPassword: string
  ) => run<boolean>(() => resetPassword(token, email, newPassword))
  const refresh = () => run<AuthResponse>(() => refreshData())

  return {
    isLoading,
    isError,
    error,
    createUser,
    loginUser,
    logoutUser,
    getCurrentUser,
    refresh,
    forgotPasswordUser,
    resetPasswordUser
  }
}

export default useAuthApi
