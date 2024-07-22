import cn from 'classnames';
import React from 'react';

import styles from './SuccessCreate.module.scss';
import { useStage } from '../../context/StageContext';
import { Button, Modal, Typography } from '../../ui-kit';

export const SuccessCreate = () => {
  const {closeStage } = useStage();

  return (
    <Modal>
      <div className={cn(styles.successContainer)}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={closeStage} />
        </div>
        <Typography font={'RedCollar'} as={'h2'} size={'title'}>
         Ура!
        </Typography>
        <div>
          <Typography font={'RedCollar'} as={'h4'} size={'m'}>
            Вы добавили новое событие:
          </Typography>
          <Typography font={'RedCollar'} as={'h4'} size={'m'} color={'red'}>
            Название события
          </Typography>
        </div>
        <div>
          <div className={styles.successDateDetails}>
            <Typography font={'RedCollar'} as={'h4'} size={'m'} className={styles.weekDay}>
              пятница
            </Typography>
            <Typography font={'RedCollar'} as={'h4'} size={'m'} className={styles.successDate}>
              21 сентября
            </Typography>
            <Typography font={'RedCollar'} as={'h4'} size={'m'} className={styles.time}>
              12:00
            </Typography>
          </div>
          <Typography size={'l'} weight={500}>
            адрес
          </Typography>
        </div>
        <Button label={'Отлично'} width={'147px'} buttonType={'filledBlack'} onClick={closeStage} />
      </div>
    </Modal>
  );
};
