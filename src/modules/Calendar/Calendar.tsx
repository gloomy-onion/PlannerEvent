import cn from 'classnames';
import React, { useState } from 'react';

import styles from './Calendar.module.scss';
import { daysInWeek, months } from './constants';
import { daysInMonth, firstDayOfMonth } from './helpers';
import { CalendarEvent, useEvents } from '../../context/EventContext';
import { DayTemplate, EventTag } from '../../ui-kit';
import { Auth } from '../Auth/Auth';
import { CreateEvent } from '../CreateEvent/CreateEvent';
import { EventDescription } from '../EventDescription/EventDescription';
import { Header } from '../Header/Header';

type CalendarProps = {
  isAuth: boolean;
};

export const Calendar = ({ isAuth }: CalendarProps) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isCreateEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [isEventDescriptionModalOpen, setEventDescriptionModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { events } = useEvents();

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const openCreateEventModal = () => setCreateEventModalOpen(true);
  const closeCreateEventModal = () => setCreateEventModalOpen(false);

  const openEventDescriptionModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setEventDescriptionModalOpen(true);
  };
  const closeEventDescriptionModal = () => {
    setSelectedEvent(null);
    setEventDescriptionModalOpen(false);
  };

  const handlePrevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getEventsForDay = (day: number): CalendarEvent[] => {
    const date = new Date(currentYear, currentMonth, day).toISOString().slice(0, 10);

    return events.filter((event) => event.dateStart.startsWith(date));
  };

  const getMonthYear = () => {
    const monthName = months[currentMonth];
    const displayYear = currentYear !== today.getFullYear() ? ` ${currentYear}` : '';
    return `${monthName}${displayYear}`;
  };

  const renderCalendar = () => {
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);
    const leadingEmptyDays = firstDay === 0 ? 6 : firstDay - 1;

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = daysInMonth(prevMonth, prevYear);

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    const prevMonthDays = Array.from({ length: leadingEmptyDays }, (_, index) => {
      const day = daysInPrevMonth - leadingEmptyDays + index + 1;
      const date = new Date(prevYear, prevMonth, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      return <DayTemplate date={day} key={`prev-${day}`} prevMonth weekend={isWeekend} />;
    });

    const totalDays = prevMonthDays.length + daysInCurrentMonth;
    const trailingEmptyDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    const nextMonthDays = Array.from({ length: trailingEmptyDays }, (_, index) => {
      const day = index + 1;
      const date = new Date(nextYear, nextMonth, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;

      return <DayTemplate date={day} key={`next-${day}`} nextMonth weekend={isWeekend} />;
    });
    const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, index) => {
      const day = index + 1;
      const date = new Date(currentYear, currentMonth, day);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const eventsForDay = getEventsForDay(day);

      return (
        <DayTemplate date={day} weekend={isWeekend} key={day}>
          <div className={styles.events}>
            {eventsForDay.map((event) => (
              <EventTag
                eventType={event.type}
                eventLabel={event.title}
                key={event.id}
                onClick={() => openEventDescriptionModal(event)}
              />
            ))}
          </div>
        </DayTemplate>
      );
    });

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  return (
    <div className={styles.calendar}>
      <Header
        isAuth={isAuth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
        currentYear={currentYear}
        openAuthModal={openAuthModal}
        openCreateEventModal={openCreateEventModal}
        getMonthYear={getMonthYear}
      />
      <div className={styles.calendarDays}>
        <div className={styles.weekDays}>
          {daysInWeek.map((day) => (
            <div className={styles.dayName} key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className={cn(styles.body, styles.days)}>{renderCalendar()}</div>
      </div>
      <Auth isOpen={isAuthModalOpen} onClose={closeAuthModal} />
      <CreateEvent isOpen={isCreateEventModalOpen} onClose={closeCreateEventModal} />
      {selectedEvent && (
        <EventDescription
          eventId={selectedEvent.id}
          photos={selectedEvent.photos}
          isAuth={isAuth}
          selectedEventDate={selectedEvent.dateStart}
          eventLocation={selectedEvent.location}
          eventLabel={selectedEvent.title}
          description={selectedEvent.description}
          isOpen={isEventDescriptionModalOpen}
          onClose={closeEventDescriptionModal}
        />
      )}
    </div>
  );
};
