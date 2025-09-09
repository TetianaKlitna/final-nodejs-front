import { useState } from 'react';
import Cookies from 'js-cookie';
import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { AuthContextType } from './AuthTypes';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(
    () => Cookies.get('user') || null
  );
  const [token, setToken] = useState<string | null>(
    () => Cookies.get('token') || null
  );

  const login = (user: string, token: string) => {
    setUser(user);
    setToken(token);
    Cookies.set('token', token, { expires: 7 });
    Cookies.set('user', user, { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
    Cookies.remove('user');
  };

  const value: AuthContextType = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
