import React, { ChangeEvent, DragEvent, useState } from 'react';

import styles from './AddPhoto.module.scss';
import { Typography } from '../Typography/Typography';

export const AddPhoto = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedImage(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.addPhotoContainer}>
      <div className={styles.uploadBox} onDrop={handleDrop} onDragOver={handleDragOver}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" className={styles.uploadedImage} />
        ) : (
          <label>
            <Typography color={'gray'} size={'l'}>
              Выберите фото или перетащите сюда
            </Typography>
            <input type="file" onChange={handleImageChange} hidden />{' '}
          </label>
        )}
      </div>
    </div>
  );
};
