import React from 'react';

import styles from './Modal.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({  children }: ModalProps) => {

  return (
    <div className={styles.modalOverlay}>
      {children}
    </div>
  );
};
