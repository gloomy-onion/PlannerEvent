import { PLACEHOLDER } from './constants';

export const getDateTimestamp = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export const getDateValue = (start?: Date | null, end?: Date | null) => {
  if (start && end) {
    return `${start?.toLocaleDateString()} - ${end?.toLocaleDateString()}`;
  }
  if (end) {
    return `${end?.toLocaleDateString()}`;
  }
  if (start) {
    return `${start?.toLocaleDateString()}`;
  }

  return PLACEHOLDER;
};

export const getToday = () => {
  const today = new Date();
  const midnightToday = today.setHours(0, 0, 0, 0);

  return { today, midnightToday };
};