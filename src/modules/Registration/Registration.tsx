import React from 'react';

import styles from './Registration.module.scss';
import { Button, Information, Modal, TextField, Typography } from '../../ui-kit';

type RegistrationProps = {
  userName?: string;
  password?: string;
  passwordError?: string | null;
  confirmPassword?: string;
  registerError?: string | null;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister?: () => void;
  onClose?: () => void;
};

export const Registration = ({
  onClose,
  userName,
  password,
  passwordError,
  confirmPassword,
  registerError,
  handleChange,
  handleRegister,
}: RegistrationProps) => {
  return (
    <Modal>
      <div className={styles.registrationContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={onClose} />
        </div>
        <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
          Регистрация
        </Typography>
        <Information />
        <TextField textFieldType={'text'} label={'Ваше имя'} value={userName} onChange={handleChange} name={'userName'} />
        <TextField
          label={'Пароль'}
          value={password}
          onChange={handleChange}
          error={passwordError}
          textFieldType={'password'}
          name={'password'}
        />
        <TextField
          label={'Повторить пароль'}
          value={confirmPassword}
          onChange={handleChange}
          error={registerError}
          textFieldType={'password'}
          name={'confirmPassword'}
        />
        <Button label={'Зарегистрироваться'} buttonType={'filledBlack'} width={'346px'} onClick={handleRegister} />
      </div>
    </Modal>
  );
};
