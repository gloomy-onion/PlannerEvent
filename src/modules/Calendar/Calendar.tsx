import cn from 'classnames';
import React, { useState } from 'react';

import styles from './Calendar.module.scss';
import { daysInWeek, months } from './constants';
import {
  daysInMonth,
  firstDayOfMonth,
  getEventsForDay,
  renderCurrentMonthDays,
  renderNextMonthDays,
  renderPrevMonthDays,
  today,
} from './helpers';
import { useEvents } from '../../context/EventContext';
import { Stages, useStage } from '../../context/StageContext';
import { Header } from '../Header/Header';

type CalendarProps = {
  isAuth: boolean;
};

export const Calendar = ({ isAuth }: CalendarProps) => {
  const { setStage } = useStage();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const { events } = useEvents();

  const openEventDescriptionModal = async (eventId: number) => {

    const event = events.find((e) => e.id === eventId);
    event && setStage(Stages.EVENT_DESCRIPTION, { event });
    console.log(event);
  };

  const openCreateEventModal = () => setStage(Stages.CREATE_EVENT);

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

    const prevMonthDays = renderPrevMonthDays(leadingEmptyDays, prevMonth, prevYear, daysInPrevMonth);
    const totalDays = prevMonthDays.length + daysInCurrentMonth;
    const trailingEmptyDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    const nextMonthDays = renderNextMonthDays(trailingEmptyDays, nextMonth, nextYear);
    const currentMonthDays = renderCurrentMonthDays(
      daysInCurrentMonth,
      currentYear,
      currentMonth,
      (day) => getEventsForDay(day, events, currentYear, currentMonth),
      openEventDescriptionModal,
    );

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className={styles.calendar}>
      <Header
        isAuth={isAuth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
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
    </div>
  );
};
