import React from 'react';

import styles from './Participant.module.scss';
import { Typography } from '../Typography/Typography';

type ParticipantProps = {
  name: string;
  photo: string;
  organizer?: boolean;
};

export const Participant = ({ name, photo, organizer = false }: ParticipantProps) => {
  return (
    <div className={styles.participantContainer}>
      <img src={photo} alt={'Avatar'} className={styles.profilePicture} />
      <div>
        <Typography weight={500} size={'m'} color={'black'}>
          {name}
        </Typography>
        {organizer ? (
          <div className={styles.organizerTag}>
            <Typography color={'purple'} size={'s'} weight={400}>
              Организатор
            </Typography>
          </div>
        ) : (
          <Typography size={'s'} color={'gray'} weight={500}>
            Участник
          </Typography>
        )}
      </div>
    </div>
  );
};
