import React from 'react';

import styles from './EventDatePlace.module.scss';
import { Typography } from '../Typography/Typography';

type EventDatePlaceProps = {
  place: string;
  weekday: string;
  date: string;
  time: string;
};
export const EventDatePlace = ({ place, date, time, weekday }: EventDatePlaceProps) => {
  return (
    <div className={styles.eventDatePlaceContainer}>
      <div className={styles.dateTime}>
        <Typography as={'h4'} font={'RedCollar'} size={'m'}>
          {weekday}
        </Typography>
        <Typography as={'h4'} font={'RedCollar'} size={'m'}>
          {date}
        </Typography>
        <Typography as={'h4'} font={'RedCollar'} size={'m'}>
          {time}
        </Typography>
      </div>
      <Typography size={'m'} weight={500}>
        {place}
      </Typography>
    </div>
  );
};
