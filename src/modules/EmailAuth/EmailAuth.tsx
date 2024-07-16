import React, { useState } from 'react';
import styles from './EmailAuth.module.scss';
import { Button, Modal, TextField, Typography } from '../../ui-kit';
import { useAuth } from '../../context/AuthContext';
import { useStage } from '../../context/StageContext';
import { validateEmail } from '../../api/helpers';

export const EmailAuth = () => {
  const { checkUserExists, loading, error, setEmail, email } = useAuth();
  const { setStage, closeStage } = useStage();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setLocalError(null);
  };

  const handleNext = async () => {
    if (!validateEmail(email)) {
      setLocalError('Некорректный e-mail');
      return;
    }

    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        setStage('password');
      } else {
        setStage('register');
      }
    } catch (err) {
      console.error('Error checking user existence:', err);
    }
  };

  return (
    <Modal>
      <div className={styles.emailContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType={'close'} onClick={closeStage} />
        </div>
        <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
          Войти
        </Typography>
        <TextField
          textFieldType={'email'}
          label={'E-mail'}
          value={email}
          onChange={handleChange}
          error={localError}
          name="email"
        />
        <Button label={loading ?  'Загрузка...' : 'Далее' } buttonType={'filledBlack'} width={'346px'} onClick={handleNext} />
        {localError && <div className={styles.error}>{localError}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </Modal>
  );
};
