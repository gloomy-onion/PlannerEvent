import React, { useState } from 'react';

import styles from './EventDescription.module.scss';
import { useEvents } from '../../context/EventContext';
import { Button, EventDatePlace, ImageCarousel, Modal, Participant, Typography } from '../../ui-kit';
import { ErrorPopup } from '../ErrorPopup/ErrorPopup';
import { useStage } from '../../context/StageContext';
import { formatEventDate } from './helpers';

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
  eventId: number;
};

export const EventDescription: React.FC<EventDescriptionProps> = ({
  eventLocation,
  eventLabel,
  description,
  onClose,
  isAuth,
  selectedEventDate,
  photos,
  eventId,
}) => {
  const { joinEvent, leaveEvent } = useEvents();
  const { setStage } = useStage();
  const [subscribedEvent, setSubscribedEvent] = useState(true);
  const openAuthModal = () => setStage('email');
  const { formattedDate, weekday, time } = formatEventDate(selectedEventDate);

  const handleJoinEvent = async () => {
    try {
      await joinEvent(eventId);
      setSubscribedEvent(true);
    } catch (error) {
      setStage('error');
    }
  };

  const handleLeaveEvent = async () => {
    try {
      await leaveEvent(eventId);
      setSubscribedEvent(false);
    } catch (error) {
      setStage('error');
    }
  };

  return (
    <Modal>
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
          <>
            {subscribedEvent ? (
              <Button buttonType={'filledBlack'} label={'Отменить участие'} onClick={() => handleLeaveEvent()} />
            ) : (
              <Button width={'343px'} label={'Присоединиться к событию'} onClick={() => handleJoinEvent()} />
            )}
          </>
        ) : (
          <div className={styles.notAuthJoin} onClick={openAuthModal}>
            <Typography size={'m'} font={'RedCollar'} as={'h4'} color={'red'}>
              Войдите
            </Typography>
            <Typography size={'m'} font={'RedCollar'} as={'h4'}>
              , чтобы присоединиться к событию
            </Typography>
          </div>
        )}
      </div>
      <ErrorPopup />
    </Modal>
  );
};
