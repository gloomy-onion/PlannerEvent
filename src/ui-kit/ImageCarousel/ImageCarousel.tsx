import cn from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import styles from './ImageCarousel.module.scss';
import { Typography } from '../Typography/Typography';

type ImageItem = {
  label: string;
  imgPath: string;
};

type ImageCarouselProps = {
  items: ImageItem[];
};

export const ImageCarousel = ({ items }: ImageCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const slideNext = () => {
    const newItems = [...items];
    const firstItem = newItems.shift();
    if (firstItem) {
      newItems.push(firstItem);
    }
    setActiveIndex((prevIndex) => {
      return (prevIndex + 1) % newItems.length;
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      return val > 0 ? val - 1 : items.length - 1;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        slidePrev();
      } else if (event.key === 'ArrowRight') {
        slideNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const newItems = [...items];
    const firstItem = newItems.shift();
    if (firstItem) {
      newItems.push(firstItem);
    }
  }, [activeIndex]);

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
        {items.map((item, index) => {
          return (
            <div key={item.label}>
              <img
                src={item.imgPath}
                alt={item.label}
                className={cn(styles.carouselItem, { [styles.carouselItemActive]: activeIndex === index })}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.carouselDots}>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className={cn(styles.carouselDot, { [styles.carouselDotActive]: activeIndex === index })}
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

