import dayjs from 'dayjs';

export const getDateInFormat = (date, type) =>  {
  if(date && type) {
    return dayjs(date).format(type);
  }
  return '';
};
