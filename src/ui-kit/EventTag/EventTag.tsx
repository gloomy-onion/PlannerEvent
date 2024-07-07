import cn from 'classnames';
import React from 'react';

import styles from './EventTag.module.scss';
import { getLabelColor } from './helpers';
import {ReactComponent as EventStar} from "../../assets/img/EventStar.svg";
import { Typography } from '../Typography/Typography';

type EventTagProps = {
  eventType: 'created' | 'accede' | 'future' | 'past';
  eventLabel: string;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export const EventTag = ({ onClick, eventLabel, eventType }: EventTagProps) => {
  return (
    <div className={cn(styles.event, styles[eventType])} onClick={onClick}>
      {eventType === 'created' && <EventStar className={styles.eventStar}/>}
      {eventType === 'accede' && <div className={styles.dot}/>}
      <Typography size={'l'} weight={500} color={getLabelColor(eventType)}>{eventLabel}</Typography>
    </div>
  );
};
