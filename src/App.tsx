import React from 'react';

import { AuthProvider } from './context/AuthContext';
import { MainPage } from './pages';

export const App = () => {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  );
};
