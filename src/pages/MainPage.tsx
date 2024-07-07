import React from 'react';

import { Calendar } from '../modules';

const events = [
  { date: '2024-06-01', title: 'Event 1', time: '10:00' },
  { date: '2024-06-15', title: 'Event 2', time: '12:00' },
];

const isAuth = (): boolean => {
  const token = localStorage.getItem('token');

  return !!token && token.length > 0;
};

export const MainPage = () => {

  return (
    <>
      <Calendar events={events} isAuth={isAuth()}  />
    </>
  );
};

