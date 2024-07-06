import React from 'react';

import styles from './ErrorPopup.module.scss';
import { Button, Modal, Typography } from '../../ui-kit';

export const ErrorPopup = () => {
  return (
    <Modal isOpen onClose={() => alert('close')}>
      <div className={styles.errorContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={() => alert('close')} />
        </div>
        <div className={styles.errorDetails}>
        <Typography font={'RedCollar'} as={'h2'} size={'title'} className={styles.errorTitle}>
          Что-то пошло не так
        </Typography>
        <Typography font={'RedCollar'} as={'h4'} size={'m'} color={'red'}>
          Попробуйте позже
        </Typography>
        </div>
        <Button label={'Хорошо'} width={'147px'} buttonType={'filledBlack'} />
      </div>
    </Modal>
  );
};
