import React, { useState } from 'react';

import styles from './DropdownDatePickers.module.scss';
import { PickDate } from '../DatePicker/PickDate';
import { DropdownContainer } from '../Dropdown/DropdownContainer';

type DropdownDatePickersProps = {
  startDate: Date | null;
  endDate: Date | null;
  onChange: (dates: [(Date | null ), (Date | null) ]) => void;
};

export const DropdownDatePickers = ({startDate, endDate, onChange} :DropdownDatePickersProps) => {

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const handlePickerApply = () => {
    setIsStartOpen(false);
    setIsEndOpen(false);
  };

  const Picker = () => <PickDate startDate={startDate} endDate={endDate} onApply={handlePickerApply} onChange={onChange}/>;

  return (
    <div className={styles.datePickersContainer}>
      <DropdownContainer
        label={'Начало'}
        value={startDate?.toLocaleDateString()}
        onClick={() => setIsEndOpen(false)}
        open={isStartOpen}
        setOpen={setIsStartOpen}
      >
        <Picker />
      </DropdownContainer>
      <DropdownContainer
        label={'Конец'}
        value={endDate?.toLocaleDateString()}
        onClick={() => setIsStartOpen(false)}
        open={isEndOpen}
        setOpen={setIsEndOpen}
      >
        <Picker />
      </DropdownContainer>
    </div>
  );
};
