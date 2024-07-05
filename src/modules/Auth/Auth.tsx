import React, { useState } from 'react';

import styles from './Auth.module.scss';
import { useAuth } from '../../context/AuthContext';
import { Button, Modal, TextField, Typography } from '../../ui-kit';
import { Registration } from '../Registration/Registration';

type AuthProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ErrorsState = {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};

export const Auth = ({ isOpen, onClose }: AuthProps) => {
  const { checkUserExists, login, register, error, loading } = useAuth();
  const [step, setStep] = useState<'email' | 'password' | 'register'>('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<ErrorsState>({
    email: null,
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

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return re.test(String(email).toLowerCase());
  };

  const handleNext = async () => {
    if (!validateEmail(formData.email)) {
      setErrors({
        ...errors,
        email: 'Некорректный e-mail',
      });
      return;
    }

    const userExists = await checkUserExists(formData.email);
    if (userExists) {
      setStep('password');
    } else {
      setStep('register');
    }
  };

  const handleLogin = async () => {
    if (!formData.password) {
      setErrors({
        ...errors,
        password: 'Обязательное поле',
      });
      return;
    }
    setErrors({
      ...errors,
      password: null,
    });

    await login(formData.email, formData.password);
    if (!error) {
      onClose();
    }
  };

  const handleRegister = async () => {
    if (!formData.password || !formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Обязательное поле',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Пароли не совпадают',
      });
      return;
    }

    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;?!*+%<>@[\]{}\\_$#])[^]{8,32}$/.test(
      formData.password,
    );
    if (!passwordValid) {
      setErrors({
        ...errors,
        confirmPassword: 'Используйте латинские буквы, цифры и спец символы',
      });
      return;
    }

    await register(formData.email, formData.password);
    if (!error) {
      onClose();
    }

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setStep('email');
  };
  const getHeader = () => {
    return step === 'email' || step === 'password' ? 'Вход' : 'Регистрация';
  };

  const renderStepContent = () => {
    switch (step) {
      case 'email':
        return (
          <div className={styles.authContainer}>
            <div className={styles.closeBtn}>
              <Button buttonType={'close'} onClick={onClose} />
            </div>
            <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
              {getHeader()}
            </Typography>
            <TextField
              textFieldType={'email'}
              label={'E-mail'}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              name="email"
            />
            <Button label={'Далее'} buttonType={'filledBlack'} width={'346px'} onClick={handleNext} />
            {loading && <div>Загрузка...</div>}
            {error && <div className={styles.error}>{error}</div>}
          </div>
        );
      case 'password':
        return (
          <div className={styles.authContainer}>
            <div className={styles.closeBtn}>
              <Button buttonType={'close'} onClick={onClose} />
            </div>
            <Typography size={'xxl'} color={'black'} font={'RedCollar'}>
              {getHeader()}
            </Typography>
            <TextField
              label={'Пароль'}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              textFieldType={'password'}
              name="password"
            />
            <Button label={'Войти'} buttonType={'filledBlack'} width={'346px'} onClick={handleLogin} />
            {loading && <div>Загрузка...</div>}
            {error && <div className={styles.error}>{error}</div>}
          </div>
        );
      case 'register':
        return (
          <Registration
            isOpen={isOpen}
            onClose={onClose}
            name={formData.name}
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            passwordError={errors.password}
            registerError={errors.confirmPassword}
            handleChange={handleChange}
            handleRegister={handleRegister}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderStepContent()}
    </Modal>
  );
};
