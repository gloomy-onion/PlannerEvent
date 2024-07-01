import cn from 'classnames';
import React from 'react';

import styles from './DayTemplate.module.scss';
import { Typography } from '../Typography/Typography';

type DayTemplateProps = {
  children?: React.ReactNode;
  weekend?: boolean;
  date: number;
  prevMonth?: boolean;
  nextMonth?: boolean;
};

export const DayTemplate = ({ children, date, weekend = false, prevMonth, nextMonth }: DayTemplateProps) => {
  return (
    <div className={cn(weekend && styles.weekend, styles.weekday)}>
      {prevMonth || nextMonth ? (
        <Typography weight={500} size={'l'} color={'gray'}>
          {date}
        </Typography>
      ) : (
        <Typography weight={500} size={'l'} >
          {date}
        </Typography>
      )}
      {children}
    </div>
  );
};
