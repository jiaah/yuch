import moment from 'moment';

export const dayBefore = date =>
  moment(date)
    .add(-1, 'days')
    .format('YYYYMMDD');

export const dayAfter = date =>
  moment(date)
    .add(1, 'days')
    .format('YYYYMMDD');

export const convertToDateForm = date =>
  moment(date).format('MM 월 DD 일 (ddd)');
