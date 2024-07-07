export const getDateTimestamp = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

export const getToday = () => {
  const today = new Date();
  const midnightToday = today.setHours(0, 0, 0, 0);

  return { today, midnightToday };
};