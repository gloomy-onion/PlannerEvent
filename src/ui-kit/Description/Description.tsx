import React, { useState } from 'react';

import styles from './Description.module.scss';
import { Typography } from '../Typography/Typography';

type DescriptionProps = {
  label?: string;
  noticeText?: string;
};

export const Description = ({ label, noticeText }: DescriptionProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length <= 500) {
      setInputValue(value);
    }
  };

  return (
    <div className={styles.description}>
      <div className={styles.descriptionCover}>
        <textarea
          className={styles.descriptionTextarea}
          value={inputValue}
          onChange={handleInputChange}
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
          }}
        >
          {label}
        </Typography>
      </div>
      <div className={styles.descriptionBottom}>
        {noticeText && (
          <Typography size={'s'} weight={400} color={'gray'}>
            {noticeText}
          </Typography>
        )}
        {inputValue.length > 450 && (
          <Typography size={'s'} weight={400} color={'gray'}>
            {inputValue.length}/500
          </Typography>
        )}
      </div>
    </div>
  );
};
