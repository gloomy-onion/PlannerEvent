import React from 'react';

import styles from './Auth.module.scss';
import { Button, Modal, TextField, Typography } from '../../ui-kit';

type AuthProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Auth = ({ isOpen, onClose }: AuthProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.authContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={onClose} />
        </div>
        <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
          Вход
        </Typography>
        <TextField textFieldType={'email'} label={'E-mail'} />
        <Button label={'Далее'} buttonType={'filledBlack'} width={'346px'} />
      </div>
    </Modal>
  );
};
