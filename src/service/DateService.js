const date = new Date();

const yearLog = date.getFullYear();
const monthLog = date.getMonth();
const dayLog = date.getDate();

const monthExtended = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formated = {
  year: yearLog,
  month: monthExtended[monthLog],
  day: dayLog,
};
