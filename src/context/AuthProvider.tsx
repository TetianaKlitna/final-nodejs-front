import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { AuthContextType } from './AuthTypes'
import {
  getAccessToken,
  setAccessToken,
  setUser,
  getUser,
  clearAuth
} from '../api/tokenStore'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username')
  )

  const login = (accessToken: string | null, username: string | null) => {
    setAccessToken(accessToken)
    setUser(username)
    setUsername(username)
  }

  const logout = () => {
    setUsername(null)
    clearAuth()
  }

  const value: AuthContextType = {
    username,
    logout,
    login
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
