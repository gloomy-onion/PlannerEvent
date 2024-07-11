export const daysInMonth = (month: number, year: number): number => new Date(year, month + 1, 0).getDate();
export const firstDayOfMonth = (month: number, year: number): number => new Date(year, month, 1).getDay();
