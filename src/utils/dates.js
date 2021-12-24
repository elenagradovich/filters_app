import dayjs from 'dayjs';

export const getDateInFormat = (date, type) =>  dayjs(date).format(type);
