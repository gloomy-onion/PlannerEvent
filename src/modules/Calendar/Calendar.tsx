import React, { useState } from 'react';
import cn from 'classnames';
import styles from './Calendar.module.scss';
import { daysInWeek, months } from './constants';
import {
  daysInMonth,
  firstDayOfMonth,
  getEventsForDay,
  handleNextMonth,
  handlePrevMonth,
  renderCurrentMonthDays,
  renderNextMonthDays,
  renderPrevMonthDays,
  today,
} from './helpers';
import { CalendarEvent, useEvents } from '../../context/EventContext';
import { DayTemplate, EventTag } from '../../ui-kit';
import { EventDescription } from '../EventDescription/EventDescription';
import { Header } from '../Header/Header';
import { useStage } from '../../context/StageContext';

type CalendarProps = {
  isAuth: boolean;
};

export const Calendar = ({ isAuth }: CalendarProps) => {
  const {  setStage, closeStage } = useStage();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const { events } = useEvents();

  const openCreateEventModal = () => setStage('createEvent');

  const openEventDescriptionModal = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setStage('eventDescription');
  };
  const closeEventDescriptionModal = () => {
    setSelectedEvent(null);
    closeStage();
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

    const prevMonthDays = renderPrevMonthDays(leadingEmptyDays, prevMonth, prevYear, daysInPrevMonth, DayTemplate);
    const totalDays = prevMonthDays.length + daysInCurrentMonth;
    const trailingEmptyDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    const nextMonthDays = renderNextMonthDays(trailingEmptyDays, nextMonth, nextYear, DayTemplate);
    const currentMonthDays = renderCurrentMonthDays(
      daysInCurrentMonth,
      currentYear,
      currentMonth,
      (day) => getEventsForDay(day, events, currentYear, currentMonth),
      openEventDescriptionModal,
      DayTemplate,
      EventTag,
      styles,
    );

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  return (
    <div className={styles.calendar}>
      <Header
        isAuth={isAuth}
        handlePrevMonth={() => handlePrevMonth(currentMonth, currentYear, setCurrentMonth, setCurrentYear)}
        handleNextMonth={() => handleNextMonth(currentMonth, currentYear, setCurrentMonth, setCurrentYear)}
        currentYear={currentYear}
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
      {selectedEvent && (
        <EventDescription
          eventId={selectedEvent.id}
          photos={selectedEvent.photos}
          isAuth={isAuth}
          selectedEventDate={selectedEvent.dateStart}
          eventLocation={selectedEvent.location}
          eventLabel={selectedEvent.title}
          description={selectedEvent.description}
          onClose={closeEventDescriptionModal}
        />
      )}
    </div>
  );
};
