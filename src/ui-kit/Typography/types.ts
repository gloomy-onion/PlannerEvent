import React from 'react';

export type TypographyProps = {
  size?:  's' | 'm' | 'l';
  color?: 'red' | 'black' | 'gray' | 'white';
  weight?: 400 | 500;
  as?: 'h1' | 'h2' | 'div' | 'h4';
  upperCase?: boolean;
  style?: React.CSSProperties;
  font?: 'redCollar' | 'TTCommons';
};
