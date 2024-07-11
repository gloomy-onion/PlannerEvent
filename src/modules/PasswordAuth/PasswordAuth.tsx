import React from 'react';
import styles from '../Auth/Auth.module.scss';
import { Button, Modal, TextField, Typography } from '../../ui-kit';
import { useAuth } from '../../context/AuthContext';

type PasswordAuthProps = {
  onClose: () => void;
  handleLogin: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string | null;
};

export const PasswordAuth = ({ onClose, value, handleLogin, handleChange, error }: PasswordAuthProps) => {
  const { loading } = useAuth();

  return (
    <Modal>
    <div className={styles.passwordContainer}>
      <div className={styles.closeBtn}>
        <Button buttonType={'close'} onClick={onClose} />
      </div>
      <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
        Войти
      </Typography>
      <TextField
        label={'Пароль'}
        value={value}
        onChange={handleChange}
        error={error}
        textFieldType={'password'}
        name="password"
      />
      <Button label={'Войти'} buttonType={'filledBlack'} width={'346px'} onClick={handleLogin} />
      {loading && <div>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
    </Modal>
  );
};
