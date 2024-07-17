import cn from 'classnames';
import React from 'react';

import styles from './Success.module.scss';
import { Button, Modal, Typography } from '../../ui-kit';

type SuccessProps = {
  successType: 'join' | 'create';
  onClose: () => void;
};

export const Success = ({ successType, onClose }: SuccessProps) => {
  return (
    <Modal>
      <div className={cn(styles.successContainer, styles[successType])}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={onClose} />
        </div>
        <Typography font={'RedCollar'} as={'h2'} size={'title'}>
          {successType === 'join' ? 'Поздравляем!' : 'Ура!'}
        </Typography>
        <div>
          <Typography font={'RedCollar'} as={'h4'} size={'m'}>
            {successType === 'join' ? 'Вы теперь участник события:' : 'Вы добавили новое событие:'}
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
        <Button label={'Отлично'} width={'147px'} buttonType={'filledBlack'} />
      </div>
    </Modal>
  );
};
