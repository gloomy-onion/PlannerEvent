import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import styles from './ImageCarousel.module.scss';
import { Typography } from '../Typography/Typography';

type ImageItem = {
  id: number;
  name: string;
  url: string;
};

type ImageCarouselProps = {
  items?: ImageItem[];
};

export const ImageCarousel = ({ items }: ImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  items ? useEffect(() => {
    if (items.length > 1) {
      const newItems = [...items];
      const firstItem = newItems.shift();
      if (firstItem) {
        newItems.push(firstItem);
      }
    }
  }, [activeIndex]) : null;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div className={styles.carouselContainer}>
        <Typography as={'h3'} font={'RedCollar'} size={'xl'}>
          Галерея
        </Typography>
        <div className={styles.noImagesMessage}>
          <Typography size={'l'}>Нет доступных изображений</Typography>
        </div>
      </div>
    );
  }

  const slideNext = () => {
    if (items.length > 1) {
      const newItems = [...items];
      const firstItem = newItems.shift();
      if (firstItem) {
        newItems.push(firstItem);
      }
      setActiveIndex((prevIndex) => {
        return (prevIndex + 1) % newItems.length;
      });
    }
  };

  const slidePrev = () => {
    if (items.length > 1) {
      setActiveIndex((val) => {
        return val > 0 ? val - 1 : items.length - 1;
      });
    }
  };

  return (
    <div className={styles.carouselContainer} ref={carouselRef}>
      <div className={styles.carouselHead}>
        <Typography as={'h3'} font={'RedCollar'} size={'xl'}>
          Галерея
        </Typography>
        <div className={styles.carouselButtons}>
          <button
            className={styles.carouselPrev}
            onClick={(e) => {
              e.preventDefault();
              slidePrev();
            }}
          />
          <button
            className={styles.carouselNext}
            onClick={(e) => {
              e.preventDefault();
              slideNext();
            }}
          />
        </div>
      </div>
      <div className={styles.floatingImages}>
        {items.map((item, index) => (
          <div key={item.id}>
            <img
              src={item.url}
              alt={item.name}
              className={cn(styles.carouselItem, { [styles.carouselItemActive]: activeIndex === index })}
            />
          </div>
        ))}
      </div>
      <div className={styles.carouselDots}>
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(styles.carouselDot, { [styles.carouselDotActive]: activeIndex === index })}
            onClick={(e) => {
              e.preventDefault();
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};
