import React from 'react';

import styles from './ErrorPopup.module.scss';
import { Button, Modal, Typography } from '../../ui-kit';

type ErrorPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  description?: string;
};

export const ErrorPopup = ({ isOpen, onClose, description }: ErrorPopupProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Modal isOpen onClose={onClose}>
      <div className={styles.errorContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={onClose} />
        </div>
        <div className={styles.errorDetails}>
          <Typography font={'RedCollar'} as={'h2'} size={'title'} className={styles.errorTitle}>
            Что-то пошло не так
          </Typography>
          <Typography font={'RedCollar'} as={'h2'} size={'title'} className={styles.errorTitle}>
            {description}
          </Typography>
          <Typography font={'RedCollar'} as={'h4'} size={'m'} color={'red'}>
            Попробуйте позже
          </Typography>
        </div>
        <Button label={'Хорошо'} width={'147px'} buttonType={'filledBlack'} onClick={onClose} />
      </div>
    </Modal>
  );
};
