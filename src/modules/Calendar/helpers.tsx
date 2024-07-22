import React from 'react';

import { CalendarEvent } from '../../context/EventContext';
import { DayTemplate, EventTag } from '../../ui-kit';

export const daysInMonth = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const firstDayOfMonth = (month: number, year: number): number => {
  return new Date(year, month, 1).getDay();
};

export const getEventsForDay = (
  day: number,
  events: CalendarEvent[],
  currentYear: number,
  currentMonth: number,
): CalendarEvent[] => {
  const date = new Date(currentYear, currentMonth, day).toISOString().slice(0, 10);

  return events.filter((event) => event.dateStart.startsWith(date));
};

export const today = new Date();

export const renderPrevMonthDays = (
  leadingEmptyDays: number,
  prevMonth: number,
  prevYear: number,
  daysInPrevMonth: number,
): React.JSX.Element[] => {
  return Array.from({ length: leadingEmptyDays }, (_, index) => {
    const day = daysInPrevMonth - leadingEmptyDays + index + 1;
    const date = new Date(prevYear, prevMonth, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    return <DayTemplate date={day} key={`prev-${day}`} prevMonth weekend={isWeekend} />;
  });
};

export const renderCurrentMonthDays = (
  daysInCurrentMonth: number,
  currentYear: number,
  currentMonth: number,
  getEventsForDay: (day: number) => CalendarEvent[],
  openEventDescriptionModal: (eventId: number) => Promise<void>,
): React.JSX.Element[] => {
  return Array.from({ length: daysInCurrentMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(currentYear, currentMonth, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const eventsForDay = getEventsForDay(day);

    return (
      <DayTemplate date={day} weekend={isWeekend} key={day}>
        <div>
          {eventsForDay.map((event) => (
            <EventTag
              eventId={event.id}
              eventType={event.type}
              eventLabel={event.title}
              key={event.id}
              onClick={() => openEventDescriptionModal(event.id)}
            />
          ))}
        </div>
      </DayTemplate>
    );
  });
};

export const renderNextMonthDays = (
  trailingEmptyDays: number,
  nextMonth: number,
  nextYear: number,
): React.JSX.Element[] => {
  return Array.from({ length: trailingEmptyDays }, (_, index) => {
    const day = index + 1;
    const date = new Date(nextYear, nextMonth, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;

    return <DayTemplate date={day} key={`next-${day}`} nextMonth weekend={isWeekend} />;
  });
};

export {};
