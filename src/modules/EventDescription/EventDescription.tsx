import React from 'react';

import styles from './EventDescription.module.scss';
import { Button, EventDatePlace, ImageCarousel, Modal, Participant, Typography } from '../../ui-kit';

type Photo = {
  id: number;
  name: string;
  url: string;
};

type EventDescriptionProps = {
  eventLocation: string;
  isAuth: boolean;
  eventLabel: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  selectedEventDate: string;
  photos: Photo[];
};

export const EventDescription: React.FC<EventDescriptionProps> = ({
  eventLocation,
  eventLabel,
  description,
  isOpen,
  onClose,
  isAuth,
  selectedEventDate,
  photos
}) => {
  if (!isOpen) {
    return null;
  }

  const eventDate = new Date(selectedEventDate);
  const day = eventDate.getDate();
  const monthIndex = eventDate.getMonth();
  const monthsDeclension = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  const month = monthsDeclension[monthIndex];
  const formattedDate = `${day} ${month}`;
  const weekdays = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
  const weekday = weekdays[eventDate.getDay()];
  const time = eventDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.eventDescriptionContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType="close" onClick={onClose} />
        </div>
        <Typography size="xxl" font="RedCollar">
          {eventLabel}
        </Typography>
        <div className={styles.eventDescriptionUpper}>
          <EventDatePlace place={eventLocation} date={formattedDate} weekday={weekday} time={time} />
          <div className={styles.eventDescriptionText}>
            <Typography size="l" weight={500} as="body">
              {description}
            </Typography>
          </div>
        </div>
        <div className={styles.eventParticipants}>
          <Typography size="xl" font="RedCollar" as="h3">
            Участники
          </Typography>
          <Participant
            name="Игорь"
            organizer
            photo="https://media.istockphoto.com/id/1200677760/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%BE%D0%B3%D0%BE-%D1%83%D0%BB%D1%8B%D0%B1%D0%B0%D1%8E%D1%89%D0%B5%D0%B3%D0%BE%D1%81%D1%8F-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B3%D0%BE-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-%D1%81%D0%BE-%D1%81%D0%BA%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=XAmUDQcCbmorrYBQOVADBgkzUX66S7-HSRyEzjwpxZI="
          />
        </div>
        <ImageCarousel items={photos} />
        {isAuth ? (
          <Button width="343px" label="Присоединиться к событию" />
        ) : (
          <>
            <Typography size="m" font="RedCollar" as="h4" color="red">
              Войдите
            </Typography>
            <Typography size="m" font="RedCollar" as="h4">
              , чтобы присоединиться к событию
            </Typography>
          </>
        )}
      </div>
    </Modal>
  );
};
