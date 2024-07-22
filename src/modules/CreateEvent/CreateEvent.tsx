import React, { useState } from 'react';

import styles from './CreateEvent.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useEvents } from '../../context/EventContext';
import { Stages, useStage } from '../../context/StageContext';
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

export const CreateEvent = () => {
  const { user } = useAuth();
  const { setStage, closeStage } = useStage();
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

  const handleDateChange = (dates: [Date | null, Date | null]) => {
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
        owner: user?.id,
      });
    } catch (error) {
      setStage(Stages.ERROR);
    } finally {
      closeStage();
      setStage(Stages.SUCCESS_CREATE);
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
            <Participant name={user?.username || 'Организатор'} organizer photo={user?.profilePicture} />
          </div>
        </div>
        <Button label={'Создать'} onClick={handleSubmit} />
      </div>
    </Modal>
  );
};
