import React from 'react';

import { AuthProvider } from './context/AuthContext';
import { EventsProvider } from './context/EventContext';
import { MainPage } from './pages';

export const App = () => {
  return (
    <AuthProvider>
      <EventsProvider>
        <MainPage />
      </EventsProvider>
    </AuthProvider>
  );
};
