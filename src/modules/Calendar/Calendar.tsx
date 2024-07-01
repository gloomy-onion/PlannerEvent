import cn from 'classnames';
import React, { useState } from 'react';

import styles from './Calendar.module.scss';
import { daysInWeek, months } from './constants';
import { daysInMonth, firstDayOfMonth } from './helpers';
import { ReactComponent as Collar } from '../../assets/img/Collar.svg';
import { Button, DayTemplate, Typography } from '../../ui-kit';

type Event = {
  date: string;
  title: string;
  time?: string;
};

type Calendar2Props = {
  events: Event[];
};

export const Calendar = ({ events }: Calendar2Props) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

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

  const getEventsForDay = (day: number): Event[] => {
    const date = new Date(currentYear, currentMonth, day).toISOString().slice(0, 10);

    return events.filter((event) => event.date === date);
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
              <div className={styles.event} key={event.title}>
                {event.time ? <span>{event.time} - </span> : null}
                {event.title}
              </div>
            ))}
          </div>
        </DayTemplate>
      );
    });

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Collar className={styles.logo} />
          <Typography as={'h3'} font={'RedCollar'} size={'logo'}>
            red collar
          </Typography>
          <Typography as={'h2'} font={'RedCollar'} size={'title'}>
            planner
          </Typography>
          <Typography as={'h2'} font={'RedCollar'} size={'title'} color={'red'}>
            event
          </Typography>
        </div>
        <div className={styles.headerRight}>
          <Typography size={'xl'} as={'h3'} font={'RedCollar'}>
            {months[currentMonth]} {currentYear !== today.getFullYear() ? currentYear : ''}
          </Typography>
          <div className={styles.calendarButtons}>
            <button onClick={handlePrevMonth} className={styles.prevButton} />
            <button onClick={handleNextMonth} className={styles.nextButton} />
          </div>
          <Button label={'Войти'} />
        </div>
      </div>
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
