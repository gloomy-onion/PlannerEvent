import React from 'react';
import { Calendar } from '../modules';
import { useAuth } from '../context/AuthContext';

export const MainPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Calendar isAuth={Boolean(user)} />
    </>
  );
};
