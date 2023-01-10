import { default as dayjs } from 'dayjs';
import moment from 'moment';

export const formatDate = (date: number, isTime = true) =>
  date ? dayjs(date).format(isTime ? 'MMMM D, YYYY h:mm A' : 'MMMM D, YYYY') : '';

export const formatChart = (data: string) => (data ? moment(data, 'YYYY_MM').format('MMMM-YYYY') : '');

export const formatMonthPicker = (data?: Date) => (data ? moment(data).format('YYYY-MM') : moment().format('YYYY-MM'));
