import cn from 'classnames';
import { ru } from 'date-fns/locale/ru';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './PickDate.module.scss';
import './styles.css';
import { getDateTimestamp, getToday } from './helpers';
import { Button } from '../index';

type DatePickerProps = {
  selected?: Date | null | [Date, Date];
  minDate?: Date;
  startDate?: Date | null;
  endDate?: Date | null;
  onChange?: (date: [Date | null, Date | null]) => void;
  label?: string;
  value?: string;
  placeholder?: string;
};

registerLocale('ru', ru);

export const PickDate: React.FC<DatePickerProps> = ({
  placeholder,
  label,
  value,
  onChange,
  startDate,
  endDate,
  ...otherProps
}) => {
  const { today, midnightToday } = getToday();

  return (
    <>
      <DatePicker
        {...otherProps}
        locale="ru"
        inline
        selectsRange
        selected={startDate}
        minDate={today}
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => onChange && onChange(dates)}
        className={styles.calendar}
        dayClassName={(date) =>
          cn({
            [styles.disabled]: getDateTimestamp(date) < midnightToday,
            [styles.currentDay]: getDateTimestamp(date) === midnightToday,
          })
        }
      />
      <div className={styles.datepickerButtons}>
        <Button label={'Применить'} buttonType={'filledBlack'} width={'312px'} />
      </div>
    </>
  );
};
