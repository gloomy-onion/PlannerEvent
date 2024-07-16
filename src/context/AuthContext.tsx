import React, { createContext, ReactNode, useContext, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { api, TOKEN } from '../api/api';
import { fetchMe } from './auth';

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
  email: string;
  setEmail: (email: string) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  checkUserExists: (email: string) => Promise<boolean>;
  getMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const checkUserExists = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/users');
      for (const user of response.data) {
        if (user.email === email) {
          return true;
        }
      }
      return false;
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
    if (!TOKEN) {
      return;
    }
    try {
      const { data } = await fetchMe();
      setUser(data);
    } catch (error) {
      setError('Что-то пошло не так, попробуйте позже');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        email,
        setEmail,
        login,
        register,
        checkUserExists,
        getMe,
      }}
    >
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
