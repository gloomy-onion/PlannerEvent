import React from 'react';

import { Calendar } from './modules';

const events = [
  { date: '2024-06-01', title: 'Event 1', time: '10:00' },
  { date: '2024-06-15', title: 'Event 2', time: '12:00' },
];

export const App = () => {
  return (
    <div>
      <Calendar events={events} isAuth={false} />
    </div>
  );
};
