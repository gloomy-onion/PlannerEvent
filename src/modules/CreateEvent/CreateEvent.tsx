import React from 'react';

import styles from './CreateEvent.module.scss';
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

type CreateEventProps = { isOpen: boolean; onClose: () => void };

export const CreateEvent = ({ isOpen, onClose }: CreateEventProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.createEventContainer}>
        <Typography font={'RedCollar'} size={'xxl'}>
          Создание события
        </Typography>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} />
        </div>
        <div className={styles.createEventInputs}>
          <div className={styles.createEventLeft}>
            <TextField textFieldType={'text'} label={'Название'} />
            <Description label={'Описание'} />
            <TextField textFieldType={'text'} label={'Участники'} />
            <AddPhoto />
          </div>
          <div className={styles.createEventRight}>
            <DropdownDatePickers />
            <div className={styles.createEventTimePlace}>
              <TextField textFieldType={'time'} label={'Время'} />
              <TextField textFieldType={'text'} label={'Место проведения'} />
            </div>
            <Participant
              name={'Игорь'}
              organizer
              photo={
                'https://media.istockphoto.com/id/1200677760/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%BF%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82-%D0%BA%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D0%BE%D0%B3%D0%BE-%D1%83%D0%BB%D1%8B%D0%B1%D0%B0%D1%8E%D1%89%D0%B5%D0%B3%D0%BE%D1%81%D1%8F-%D0%BC%D0%BE%D0%BB%D0%BE%D0%B4%D0%BE%D0%B3%D0%BE-%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D0%BA%D0%B0-%D1%81%D0%BE-%D1%81%D0%BA%D1%80%D0%B5%D1%89%D0%B5%D0%BD%D0%BD%D1%8B%D0%BC%D0%B8-%D1%80%D1%83%D0%BA%D0%B0%D0%BC%D0%B8.jpg?s=612x612&w=0&k=20&c=XAmUDQcCbmorrYBQOVADBgkzUX66S7-HSRyEzjwpxZI='
              }
            />
          </div>
        </div>
        <Button label={'Создать'} />;
      </div>
    </Modal>
  );
};
