import React, { useState } from 'react';

import styles from './EmailAuth.module.scss';
import { validateEmail } from '../../api/helpers';
import { useAuth } from '../../context/AuthContext';
import { Stages, useStage } from '../../context/StageContext';
import { Button, Modal, TextField, Typography } from '../../ui-kit';

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
        setStage(Stages.PASSWORD);
      } else {
        setStage(Stages.REGISTER);
      }
    } catch (err) {
      setStage(Stages.ERROR);
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
        <Button
          label={loading ? 'Загрузка...' : 'Далее'}
          buttonType={'filledBlack'}
          width={'346px'}
          onClick={handleNext}
        />
        {localError && <div className={styles.error}>{localError}</div>}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </Modal>
  );
};
