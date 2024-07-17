import React from 'react';

import { AuthProvider } from './context/AuthContext';
import { EventsProvider } from './context/EventContext';
import { StageProvider } from './context/StageContext';
import { MainPage } from './pages';

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
