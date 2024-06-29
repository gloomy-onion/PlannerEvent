import React, { useState } from 'react';

import styles from './TextField.module.scss';
import { ReactComponent as ClosedEye } from '../../assets/img/ClosedEye.svg';
import { ReactComponent as OpenEye } from '../../assets/img/OpenEye.svg';
import { Typography } from '../Typography/Typography';

type TextFieldProps = {
  placeholder?: string;
  textFieldType?: 'text' | 'password' | 'email' | 'time';
  noticeText?: string;
  label?: string;
};

export const TextField = ({ placeholder, textFieldType = 'text', noticeText, label }: TextFieldProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const clickClear = () => {
    setInputValue('');
    setIsFocused(false);
  };

  const showPassword = () => {
    setIsShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.textField}>
      <div className={styles.textFieldInputCover}>
        <input
          type={textFieldType === 'password' ? (isShowPassword ? 'text' : 'password') : textFieldType}
          placeholder={isFocused ? placeholder : ''}
          className={styles.floatingInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            if (!inputValue) {
              setIsFocused(false);
            }
          }}
        />
        <Typography
          color={'gray'}
          style={{
            left: '16px',
            top: isFocused ? '1px' : '20px',
            fontSize: isFocused ? '14px' : '18px',
            position: 'absolute',
            background: 'white',
          }}
        >
          {label}
        </Typography>
        {inputValue && textFieldType !== 'password' && <button className={styles.clearButton} onClick={clickClear} />}
        {textFieldType === 'password' && inputValue && (
          <div onClick={showPassword}>
            {isShowPassword ? <OpenEye className={styles.openEye} /> : <ClosedEye className={styles.closedEye} />}
          </div>
        )}
      </div>
      {noticeText && (
        <Typography size={'s'} weight={400} color={'gray'}>
          {noticeText}
        </Typography>
      )}
    </div>
  );
};
