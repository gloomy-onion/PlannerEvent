import React from 'react';

import styles from './Header.module.scss';
import Avatar from '../../assets/img/Avatar.png';
import { ReactComponent as Collar } from '../../assets/img/Collar.svg';
import { useAuth } from '../../context/AuthContext';
import { useStage } from '../../context/StageContext';
import { Button, Typography } from '../../ui-kit';

type HeaderProps = {
  isAuth: boolean;
  getMonthYear: () => string;
  openCreateEventModal: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
};

export const Header = ({
  openCreateEventModal,
  isAuth,
  handlePrevMonth,
  handleNextMonth,
  getMonthYear,
}: HeaderProps) => {
  const { user } = useAuth();
  const { setStage } = useStage();

  const openEmailStage = () => {
    setStage('email');
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <Collar className={styles.logo} />
        <Typography as={'h3'} font={'RedCollar'} size={'logo'}>
          red collar
        </Typography>
        <Typography as={'h2'} font={'RedCollar'} size={'title'}>
          planner
        </Typography>
        <Typography as={'h2'} font={'RedCollar'} size={'title'} color={'red'}>
          event
        </Typography>
      </div>
      <div className={styles.headerRight}>
        <Typography size={'xl'} as={'h3'} font={'RedCollar'}>
          {getMonthYear()}
        </Typography>
        <div className={styles.calendarButtons}>
          <button onClick={handlePrevMonth} className={styles.prevButton} />
          <button onClick={handleNextMonth} className={styles.nextButton} />
        </div>
        {!isAuth ? (
          <Button label={'Войти'} onClick={openEmailStage} />
        ) : (
          <div className={styles.isAuthBlock}>
            <Button buttonType={'add'} onClick={openCreateEventModal} />
            <img alt={'Avatar'} src={user?.profilePicture || Avatar} width={'80px'} />
          </div>
        )}
      </div>
    </div>
  );
};
