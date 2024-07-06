import React from 'react';

import { Auth, Calendar, CreateEvent, ErrorPopup, EventDescription, Registration, Success } from '../modules';

const events = [
  { date: '2024-06-01', title: 'Event 1', time: '10:00' },
  { date: '2024-06-15', title: 'Event 2', time: '12:00' },
];

const isAuth = (): boolean => {
  const token = localStorage.getItem('token');

  return !!token && token.length > 0;
};

export const MainPage = () => {
  const STAGES = {
    createEvent: CreateEvent,
    auth: Auth,
    registration: Registration,
    eventDescription: EventDescription,
    success: Success,
    error: ErrorPopup,
  };

  return (
    <>
      <Calendar events={events} isAuth={isAuth()}  />
    </>
  );
};
