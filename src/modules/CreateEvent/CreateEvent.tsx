import React, {  useState } from 'react';

import styles from './CreateEvent.module.scss';
import { api, TOKEN } from '../../api/api';
import { useEvents } from '../../context/EventContext';
import {
  AddPhoto,
  Button,
  Description,
  DropdownDatePickers,
  Modal,
  Participant,
  TextField,
  Typography,
} from '../../ui-kit';
import { useStage } from '../../context/StageContext';

type CreateEventProps = {
};

export const CreateEvent: React.FC<CreateEventProps> = ({ }) => {
  const {  setStage, closeStage } = useStage();
  const { createEvent } = useEvents();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    participants: '',
    time: '',
    location: '',
    photo: '',
    dateStart: '',
    dateEnd: '',
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [organizer, setOrganizer] = useState<string | null>(null);

  const getOrganizer = async () => {
    try {
      const response = await api.get('users/me', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      setOrganizer(response.data.username);
    } catch (error) {
      setStage('error');
    }
  };
  const handleDateChange = ( dates: [(Date | null), (Date | null )]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setFormData((prev) => ({
      ...prev,
      dateStart: start ? start.toISOString() : '',
      dateEnd: end ? end.toISOString() : '',
    }));
  };

  const onDescriptionValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFormData({ ...formData, description: e.target.value });

  const handleSubmit = async () => {
    try {
      await createEvent({
        title: formData.title,
        description: formData.description,
        participants: formData.participants.split(','),
        dateStart: formData.dateStart,
        dateEnd: formData.dateEnd,
        location: formData.location,
        time: formData.time,
        photos: [],
      });
    } catch (error) {
      setStage('error');
    }
  };

  return (
    <Modal>
      <div className={styles.createEventContainer}>
        <Typography font="RedCollar" size="xxl">
          Создание события
        </Typography>
        <div className={styles.closeBtn}>
          <Button buttonType="close" onClick={closeStage} />
        </div>
        <div className={styles.createEventInputs}>
          <div className={styles.createEventLeft}>
            <TextField
              textFieldType="text"
              label="Название"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <Description label="Описание" value={formData.description} onChange={onDescriptionValueChange} />
            <TextField
              textFieldType="text"
              label="Участники"
              value={formData.participants}
              onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
            />
            <AddPhoto />
          </div>
          <div className={styles.createEventRight}>
            <DropdownDatePickers startDate={startDate} endDate={endDate} onChange={handleDateChange} />
            <div className={styles.createEventTimePlace}>
              <TextField
                textFieldType="time"
                label="Время"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
              <TextField
                textFieldType="text"
                label="Место проведения"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <Participant
              name={organizer || 'Организатор'}
              organizer
              photo={
                'https://media.istockphoto.com/id/1200677760/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%BE%D0%B3%D0%BE-%D1%83%D0%BB%D1%8B%D0%B1%D0%B0%D1%8E%D1%89%D0%B5%D0%B3%D0%BE%D1%81%D1%8F-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B3%D0%BE-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-%D1%81%D0%BE-%D1%81%D0%BA%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=XAmUDQcCbmorrYBQOVADBgkzUX66S7-HSRyEzjwpxZI='
              }
            />
          </div>
        </div>
        <Button label={'Создать'} onClick={handleSubmit} />
      </div>
    </Modal>
  );
};
