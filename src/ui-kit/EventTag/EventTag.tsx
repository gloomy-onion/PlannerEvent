import cn from 'classnames';
import React from 'react';

import styles from './EventTag.module.scss';
import { getLabelColor } from './helpers';
import {ReactComponent as EventStar} from "../../assets/img/EventStar.svg";
import { Typography } from '../Typography/Typography';

type EventTagProps = {
  eventId: number,
  eventType: 'created' | 'accede' | 'future' | 'past';
  eventLabel: string;
  onClick: (eventId: number) => void;
};

export const EventTag = ({ onClick, eventLabel, eventType, eventId }: EventTagProps) => {
  return (
    <div className={cn(styles.event, styles[eventType])} onClick={() => onClick(eventId)}>
      {eventType === 'created' && <EventStar className={styles.eventStar}/>}
      {eventType === 'accede' && <div className={styles.dot}/>}
      <Typography size={'l'} weight={500} color={getLabelColor(eventType)}>{eventLabel}</Typography>
    </div>
  );
};
