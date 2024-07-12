import React from 'react';
import styles from './EmailAuth.module.scss';
import { Button, Modal, TextField, Typography } from '../../ui-kit';
import { useAuth } from '../../context/AuthContext';

type EmailAuthProps = {
  onClose?: () => void;
  handleNext?: () => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string | null;
}

export const EmailAuth = ({onClose, handleNext, handleChange, error, value} : EmailAuthProps) => {
  const { loading } = useAuth();

  return (
    <Modal>
    <div className={styles.emailContainer}>
      <div className={styles.closeBtn}>
        <Button buttonType={'close'} onClick={onClose} />
      </div>
      <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
        Войти
      </Typography>
      <TextField
        textFieldType={'email'}
        label={'E-mail'}
        value={value}
        onChange={handleChange}
        error={error}
        name="email"
      />
      <Button label={'Далее'} buttonType={'filledBlack'} width={'346px'} onClick={handleNext} />
      {loading && <div>Загрузка...</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
    </Modal>
  );
};