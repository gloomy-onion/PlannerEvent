import React from 'react';

import { AuthProvider } from './context/AuthContext';
import { EventsProvider } from './context/EventContext';
import { MainPage } from './pages';
import { StageProvider } from './context/StageContext';

export const App = () => {
  return (
    <AuthProvider>
      <EventsProvider>
        <StageProvider>
          <MainPage />
        </StageProvider>
      </EventsProvider>
    </AuthProvider>
  );
};
