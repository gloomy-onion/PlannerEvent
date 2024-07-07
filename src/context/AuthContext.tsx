import axios, { AxiosResponse } from 'axios';
import React, { createContext, ReactNode, useContext, useState } from 'react';

import { api, API_TOKEN } from '../api/api';

type User = {
  id: number;
  email: string;
  profilePicture: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  checkUserExists: (email: string) => Promise<boolean>;
  getMe: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkUserExists = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await api.get(`/users?email=${email}`);

      return true;
    } catch (err) {
      setError('Что-то пошло не так, попробуйте позже');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<{ jwt: string; user: User }> = await api.post('/auth/local', {
        identifier: email,
        password,
      });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.jwt);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Неверный пароль');
      } else {
        setError('Что-то пошло не так, попробуйте позже');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response: AxiosResponse<{ jwt: string; user: User }> = await api.post('/auth/local/register', {
        email,
        password,
        username,
      });
      setUser(response.data.user);
      localStorage.setItem('token', response.data.jwt);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Что-то пошло не так, попробуйте позже');
      } else {
        setError('Что-то пошло не так, попробуйте позже');
      }
    } finally {
      setLoading(false);
    }
  };

  const getMe = async () => {
    try {
      const response = await api.get('users/me', {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      });

      return response.data;
    } catch (error) {
      setError('Что-то пошло не так, попробуйте позже');
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, checkUserExists, getMe }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен быть внутри AuthProvider');
  }

  return context;
};
