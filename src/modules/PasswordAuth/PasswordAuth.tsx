import React, { useState } from 'react';

import styles from './PasswordAuth.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useStage } from '../../context/StageContext';
import { Button, Modal, TextField, Typography } from '../../ui-kit';

export const PasswordAuth = () => {
  const { login, error, loading, email } = useAuth();
  const { closeStage } = useStage();
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setLocalError(null);
  };

  const handleLogin = async () => {
    if (!password) {
      setLocalError('Обязательное поле');
      return;
    }

    await login(email, password);
    if (!error) {
      closeStage();
    }
  };

  return (
    <Modal>
      <div className={styles.passwordContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={closeStage} />
        </div>
        <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
          Войти
        </Typography>
        <TextField
          label={'Пароль'}
          value={password}
          onChange={handleChange}
          error={localError}
          textFieldType={'password'}
          name="password"
        />
        <Button
          label={loading ? 'Загрузка...' : 'Войти'}
          buttonType={'filledBlack'}
          width={'346px'}
          onClick={handleLogin}
        />
        {localError && <div className={styles.error}>{localError}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </Modal>
  );
};
