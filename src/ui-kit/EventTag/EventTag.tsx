import React from 'react';
import styles from './EventTag.module.scss';
import { Typography } from '../Typography/Typography';
import cn from 'classnames';
import { getLabelColor } from './helpers';
import {ReactComponent as EventStar} from './../../assets/img/EventStar.svg';

type EventTagProps = {
  eventType: 'created' | 'accede' | 'future' | 'past';
  eventLabel: string;
};

export const EventTag = ({ eventLabel, eventType }: EventTagProps) => {
  return (
    <div className={cn(styles.event, [styles[eventType]])}>
      {eventType === 'created' && <EventStar className={styles.eventStar}/>}
      {eventType === 'accede' && <div className={styles.dot}/>}
      <Typography size={'l'} weight={500} color={getLabelColor(eventType)}>{eventLabel}</Typography>
    </div>
  );
};
