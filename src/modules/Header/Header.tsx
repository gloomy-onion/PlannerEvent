import React from 'react';
import styles from './Header.module.scss';
import { ReactComponent as Collar } from '../../assets/img/Collar.svg';
import { Button, Typography } from '../../ui-kit';
import Avatar from '../../assets/img/Avatar.png';
import { useAuth } from '../../context/AuthContext';

type HeaderProps = {
  isAuth: boolean;
  openAuthModal: () => void;
  getMonthYear: () => string;
  openCreateEventModal: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
  currentYear: number;
};

export const Header = ({
  openCreateEventModal,
  openAuthModal,
  isAuth,
  handlePrevMonth,
  handleNextMonth,
  getMonthYear,
}: HeaderProps) => {
  const { user } = useAuth();

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
          <Button label={'Войти'} onClick={openAuthModal} />
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
