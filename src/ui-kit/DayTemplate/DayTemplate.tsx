import React from 'react';

import styles from './DayTemplate.module.scss';

import cn from 'classnames';
import { Typography } from '../Typography/Typography';

type DayTemplateProps = {
  children?: React.ReactNode;
  date: number;
  weekend?: boolean;
};

export const DayTemplate = ({ children, date, weekend = false }: DayTemplateProps) => {
  return (
    <div className={cn(weekend && styles.weekend, styles.weekday)}>
      <Typography size={'l'} weight={500}>
        {date}
      </Typography>
      {children}
    </div>
  );
};
