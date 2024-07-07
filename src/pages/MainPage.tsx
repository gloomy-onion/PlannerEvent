import React from 'react';

import { API_TOKEN } from '../api/api';
import { Calendar } from '../modules';

const isAuth = (): boolean => {

  return !!API_TOKEN && API_TOKEN.length > 0;
};

export const MainPage = () => {

  return (
    <>
      <Calendar isAuth={isAuth()}  />
    </>
  );
};

