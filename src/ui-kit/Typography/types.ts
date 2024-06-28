import React from 'react';

export type TypographyProps = {
  size?:  's' | 'm' | 'l' | 'xl';
  color?: 'red' | 'black' | 'gray' | 'white' | 'purple';
  weight?: 400 | 500;
  as?: 'h1' | 'h2' | 'div' | 'h4' | 'h3';
  upperCase?: boolean;
  style?: React.CSSProperties;
  font?: 'RedCollar' | 'TTCommons';
};

