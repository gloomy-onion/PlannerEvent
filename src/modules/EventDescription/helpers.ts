import { monthsDeclension, weekdays } from './constants';

export const formatEventDate = (selectedEventDate: string): { formattedDate: string, weekday: string, time: string } => {
  const eventDate = new Date(selectedEventDate);
  const day = eventDate.getDate();
  const monthIndex = eventDate.getMonth();
  const month = monthsDeclension[monthIndex];
  const formattedDate = `${day} ${month}`;
  const weekday = weekdays[eventDate.getDay()];
  const time = eventDate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return { formattedDate, weekday, time };
};