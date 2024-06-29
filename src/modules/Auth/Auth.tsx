import React from 'react';

import styles from './Auth.module.scss';
import { Button, TextField , Typography } from '../../ui-kit';

export const Auth = () => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.closeBtn}><Button buttonType={'close'}/></div>
      <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
        Вход
      </Typography>
      <TextField textFieldType={'email'} label={'E-mail'} />
      <Button label={'Далее'} buttonType={'filledBlack'} width={'346px'} />
    </div>
  );
};
