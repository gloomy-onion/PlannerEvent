import React from 'react';

import styles from './Registration.module.scss';
import { Button, Information, TextField, Typography } from '../../ui-kit';

export const Registration = () => {
  return (
    <div className={styles.registrationContainer}>
      <div className={styles.closeBtn}>
        <Button buttonType={'close'} />
      </div>
      <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
        Регистрация
      </Typography>
      <Information />
      <TextField textFieldType={'email'} label={'E-mail'} />
      <TextField textFieldType={'password'} label={'Пароль'} />
      <TextField textFieldType={'password'} label={'Повторить пароль'} />
      <Button label={'Зарегестрироваться'} buttonType={'filledBlack'} width={'346px'} />
    </div>
  );
};
