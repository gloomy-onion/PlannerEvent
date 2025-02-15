import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

import styles from './Button.module.scss';
import { getLabelColor } from './helpers';
import { Typography } from '../Typography/Typography';

type ButtonProps = {
  disabled?: boolean;
  buttonType?:
    | 'filledBlack'
    | 'filledRed'
    | 'outlineBlack'
    | 'outlineRed'
    | 'previous'
    | 'next'
    | 'close'
    | 'add'
    | 'errorClose';
  label?: string;
  onClick?: () => void;
  width?: string;
};

export const Button = ({
  buttonType = 'filledBlack',
  disabled = false,
  label,
  onClick,
  width,
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      disabled={disabled}
      className={cn(styles.button, styles[buttonType])}
      onClick={() => onClick && onClick()}
      style={{ width }}
    >
      <Typography as={'h4'} weight={400} color={getLabelColor(buttonType, disabled)} size={'m'} font={'RedCollar'}>
        {label}
      </Typography>
    </button>
  );
};
