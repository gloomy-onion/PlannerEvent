import React from 'react';

import styles from './Information.module.scss';
import { ReactComponent as Info } from '../../assets/img/Info.svg';
import { ReactComponent as InfoError } from '../../assets/img/InfoError.svg';
import { Typography } from '../Typography/Typography';

type InformationProps = {
  isError?: boolean;
};

export const Information = ({ isError }: InformationProps) => {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoImg}> {isError ? <InfoError /> : <Info />}</div>
        <Typography weight={400} size={'s'}>
          {isError
            ? 'Пароли не совпадают. Используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \\ _ {} $ # )'
            : 'Используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \\ _ {} $ # )'}
        </Typography>
    </div>
  );
};
