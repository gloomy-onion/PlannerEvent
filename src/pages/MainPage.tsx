import React, { useEffect } from 'react';

import { useAuth } from '../context/AuthContext';
import { Calendar } from '../modules';

export const MainPage = () => {
  const { user, getMe } = useAuth();

  useEffect(() => {
    getMe();
  }, []);
  
  return (
    <>
      <Calendar isAuth={Boolean(user)} />
    </>
  );
};
