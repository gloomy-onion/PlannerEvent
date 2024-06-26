import React, { useEffect, useRef } from 'react';

import styles from './Dropdown.module.scss';
import { ReactComponent as CalendarIcon } from '../../assets/img/CalendarIcon.svg';
import { Typography } from '../Typography/Typography';

type DropdownProps = {
  label?: string;
  children?: React.ReactNode;
  value?: string | null;
  open?: boolean;
  setOpen: (value: boolean) => void;
  onClick?: () => void;
};

type ComposedPath = () => Node[];

export const DropdownContainer = ({ label, children, value, open, setOpen, onClick }: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setOpen(!open);
    onClick && onClick();
  };

  const handleClickOutside = (e: MouseEvent) => {
    const event = e as MouseEvent & {
      path: Node[];
      composedPath?: ComposedPath;
    };
    const path = event.path || (e.composedPath && e.composedPath());
    if (path && !path.includes(dropdownRef.current as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', (e) => handleClickOutside(e));
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.dropdownBox}>
        <div
          className={styles.dropdown}
          onClick={(e) => {
            e.stopPropagation();
            toggleDropDown();
          }}
        >
          {value ? (
            <Typography
              color={'gray'}
              style={{
                left: '16px',
                top: value ? '1px' : '20px',
                fontSize: value ? '14px' : '18px',
                position: 'absolute',
              }}
            >
              {label}
            </Typography>
          ) : (
            <Typography color={'gray'}>{label}</Typography>
          )}
          {value && (
            <Typography color={'black'} size={'l'}>
              {value}
            </Typography>
          )}
          <CalendarIcon />
        </div>
        {open && (
          <div ref={dropdownRef} className={styles.dropdownExpanded}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
