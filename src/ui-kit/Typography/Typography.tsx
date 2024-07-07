import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

import styles from './Typography.module.scss';
import { TypographyProps } from './types';

const sizeMap = {
  s: '14px',
  m: '18px',
  l: '20px',
  xl: '24px',
  xxl: '36px',
  logo: '26px',
  title: '64px',
};

export const Typography = ({
  children,
  as: Text = 'div',
  color = 'black',
  weight = 400,
  upperCase = false,
  size = 'm',
  style,
  font = 'TTCommons',
  className,
}: PropsWithChildren<TypographyProps>) => {
  return (
    <Text
      style={{ fontWeight: weight, fontSize: sizeMap[size], ...style }}
      className={cn(styles[font], styles[color], className, { [styles.upperCase]: upperCase })}
    >
      {children}
    </Text>
  );
};
