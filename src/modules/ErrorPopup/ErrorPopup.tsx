import React from 'react';

import styles from './ErrorPopup.module.scss';
import { useStage } from '../../context/StageContext';
import { Button, Modal, Typography } from '../../ui-kit';

type ErrorPopupProps = {
  description?: string;
};

export const ErrorPopup = ({ description }: ErrorPopupProps) => {
  const { closeStage } = useStage();

  return (
    <Modal>
      <div className={styles.errorContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={closeStage} />
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
        <Button label={'Хорошо'} width={'147px'} buttonType={'filledBlack'} onClick={closeStage} />
      </div>
    </Modal>
  );
};
