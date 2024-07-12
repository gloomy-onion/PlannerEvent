import React, { useState } from 'react';
import { validateEmail } from '../../api/helpers';
import { useAuth } from '../../context/AuthContext';
import { Registration } from '../Registration/Registration';
import { EmailAuth } from '../EmailAuth/EmailAuth';
import { PasswordAuth } from '../PasswordAuth/PasswordAuth';

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
  const { checkUserExists, login, register, error } = useAuth();
  const [step, setStep] = useState<'email' | 'password' | 'register'>('email');
  const [formData, setFormData] = useState({
    userName: '',
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

    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.,:;?!*+%<>@[\]{}\\_$#])[^]{8,32}$/.test(
      formData.password,
    );

    if (!validatePassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Используйте латинские буквы, цифры и спец символы',
      });
      return;
    }

    await register(formData.email, formData.password, formData.userName);
    if (!error) {
      onClose();
    }

    setFormData({
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setStep('email');
  };

  const renderStepContent = () => {
    switch (step) {
      case 'email':
        return (
          <EmailAuth
            onClose={onClose}
            handleChange={handleChange}
            handleNext={handleNext}
            value={formData.email}
            error={errors.email}
          />
        );
      case 'password':
        return (
          <PasswordAuth
            onClose={onClose}
            value={formData.password}
            handleLogin={handleLogin}
            error={errors.password}
            handleChange={handleChange}
          />
        );
      case 'register':
        return (
          <Registration
            onClose={onClose}
            userName={formData.userName}
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

  return <> {renderStepContent()}</>;
};
