import React, { useState } from 'react';

import styles from './TextField.module.scss';
import { ReactComponent as ClosedEye } from '../../assets/img/ClosedEye.svg';
import { ReactComponent as OpenEye } from '../../assets/img/OpenEye.svg';
import { Typography } from '../Typography/Typography';

type TextFieldProps = {
  placeholder?: string;
  textFieldType?: 'text' | 'password' | 'email' | 'time';
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  name?: string;
};

export const TextField = ({
  placeholder,
  textFieldType = 'text',
  label,
  value,
  onChange,
  error,
  name,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const showPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  const getInputType = () => {
    if (textFieldType === 'password') {
      if (isShowPassword) {
        return 'text';
      }

      return 'password';
    }

    return textFieldType;
  };

  const handleBlur = () => {
   if (value !== '') {
     setIsFocused(true);
   } else {
     setIsFocused(false);
   }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={styles.textField}>
      <div onFocus={handleFocus}  className={styles.textFieldInputCover}>
        <input
          name={name}
          type={getInputType()}
          placeholder={isFocused ? placeholder : ''}
          className={styles.floatingInput}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
        />
        <Typography
          color={'gray'}
          className={isFocused || value ? styles.focusedLabel : styles.notFocusedLabel}
          size={isFocused ? 's' : 'm'}
        >
          {label}
        </Typography>
        {value && textFieldType !== 'password' && (
          <button
            className={styles.clearButton}
            onClick={() => onChange && onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
          />
        )}
        {textFieldType === 'password' && value && (
          <div onClick={showPassword}>
            {isShowPassword ? <OpenEye className={styles.openEye} /> : <ClosedEye className={styles.closedEye} />}
          </div>
        )}
      </div>
      {error && (
        <Typography size={'s'} weight={400} color={'red'}>
          {error}
        </Typography>
      )}
    </div>
  );
};
