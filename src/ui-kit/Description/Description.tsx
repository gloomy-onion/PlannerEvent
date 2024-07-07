import React, { useState } from 'react';

import styles from './Description.module.scss';
import { Typography } from '../Typography/Typography';

type DescriptionProps = {
  label?: string;
  noticeText?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Description: React.FC<DescriptionProps> = ({ label, noticeText, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={styles.description}>
      <div className={styles.descriptionCover}>
        <textarea
          className={styles.descriptionTextarea}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <Typography
          color={'gray'}
          style={{
            left: '16px',
            top: isFocused || !!value ? '1px' : '20px',
            fontSize: isFocused || !!value ? '14px' : '18px',
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
        {value && (
          <Typography size={'m'} weight={400} color={'gray'}>
            {value.length}/500
          </Typography>
        )}
      </div>
    </div>
  );
};
