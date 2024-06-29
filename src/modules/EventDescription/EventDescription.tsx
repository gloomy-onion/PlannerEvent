import React from 'react';

import styles from './EventDescription.module.scss';
import { eventImg } from '../../assets/img/eventImg';
import { Button, EventDatePlace, ImageCarousel, Participant, Typography } from '../../ui-kit';

type EventDescriptionProps = {
  eventLabel: string;
  description: string;
};

export const EventDescription = ({ eventLabel, description }: EventDescriptionProps) => {
  return (
    <div className={styles.eventDescriptionContainer}>
      <div className={styles.closeBtn}><Button buttonType={'close'}/></div>
      <Typography size={'xxl'} font={'RedCollar'}>
        {eventLabel}
      </Typography>
      <div className={styles.eventDescriptionUpper}>
        <EventDatePlace
          place={'г. Москва, Ленинградский проспект, 80'}
          date={'18 Сентября'}
          weekday={'суббота'}
          time={'12:00'}
        />
        <div className={styles.eventDescriptionText}>
          <Typography size={'l'} weight={500} as={'body'}>
            {description}
          </Typography>
        </div>
      </div>
     <div className={styles.eventParticipants}> <Typography size={'xl'} font={'RedCollar'} as={'h3'}>
        Участники
      </Typography>
      <Participant
        name={'Игорь'}
        organizer
        photo={
          'https://media.istockphoto.com/id/1200677760/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%BE%D0%B3%D0%BE-%D1%83%D0%BB%D1%8B%D0%B1%D0%B0%D1%8E%D1%89%D0%B5%D0%B3%D0%BE%D1%81%D1%8F-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B3%D0%BE-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-%D1%81%D0%BE-%D1%81%D0%BA%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=XAmUDQcCbmorrYBQOVADBgkzUX66S7-HSRyEzjwpxZI='
        }
      /> </div>
      <ImageCarousel items={eventImg} />
      <Button width={'343px'} label={'Присоединиться к событию'} />
    </div>
  );
};
