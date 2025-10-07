import { useState } from 'react'
import type { ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { AuthContextType } from './AuthTypes'
import { setAccessToken, getAccessToken } from '../api/tokenStore'
import { useEffect } from 'react'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const r = await fetch(`${import.meta.env.VITE_APP_API_URL}/auth/user`, {
          credentials: 'include'
        })
        if (!r.ok) throw new Error()
        const { user, accessToken } = await r.json()
        setUser(user.name)
        setAccessToken(accessToken)
      } catch {
        setUser(null)
      }
    })()
  }, [])

  const login = (user: string, token: string) => {
    setUser(user)
    setAccessToken(token)
  }

  const logout = () => {
    setUser(null)
    setAccessToken(null)
  }

  const value: AuthContextType = {
    user,
    token: getAccessToken(),
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
