import React, { useState } from 'react';

import styles from './Registration.module.scss';
import { useAuth } from '../../context/AuthContext';
import { useStage } from '../../context/StageContext';
import { Button, Information, Modal, TextField, Typography } from '../../ui-kit';

export const Registration = () => {
  const { register, error, loading } = useAuth();
  const { closeStage, setStage } = useStage();
  const { email } = useAuth();

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ password: string | null; confirmPassword: string | null }>({
    password: null,
    confirmPassword: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
  };

  const handleRegister = async () => {
    const { userName, password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Обязательное поле' });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: 'Пароли не совпадают' });
      return;
    }

    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;?!*+%<>@[\]{}\\_$#])[^]{8,32}$/.test(password);

    if (!validatePassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Используйте латинские буквы, цифры и спец символы',
      });
      return;
    }

    try {
      await register(email, password, userName);
      if (!error) {
        closeStage();
      }
      setFormData({ userName: '', password: '', confirmPassword: '' });
    } catch (err) {
      setStage('error')
    }
  };

  return (
    <Modal>
      <div className={styles.registrationContainer}>
        <div className={styles.closeBtn}>
          <Button buttonType="close" onClick={closeStage} />
        </div>
        <Typography size="xxl" color="black" font="RedCollar">
          Регистрация
        </Typography>
        <Information />
        <TextField
          textFieldType="text"
          label="Ваше имя"
          value={formData.userName}
          onChange={handleChange}
          name="userName"
        />
        <TextField
          label="Пароль"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          textFieldType="password"
          name="password"
        />
        <TextField
          label="Повторить пароль"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          textFieldType="password"
          name="confirmPassword"
        />
        <Button
          label={loading ?  'Загрузка...' : 'Зарегистрироваться' }
          buttonType="filledBlack"
          width="346px"
          onClick={handleRegister}
        />
      </div>
    </Modal>
  );
};
