import moment from 'moment';
import { today } from '../helpers/moment';

export const dayBefore = date =>
  moment(date)
    .add(-1, 'days')
    .format('YYYYMMDD');

export const dayAfter = date =>
  moment(date)
    .add(1, 'days')
    .format('YYYYMMDD');

export const weekBefore = date =>
  moment(date)
    .add(-7, 'days')
    .format('YYYYMMDD');

export const weekAfter = date =>
  moment(date)
    .add(7, 'days')
    .format('YYYYMMDD');

const lastMonth = moment()
  .add(-1, 'months')
  .format('YYYYMM');

export const firstDayOfLastMonth = () => {
  const value = `${lastMonth}01`;
  return value;
};

export const formatToDateForm = date =>
  moment(date).format('MM 월 DD 일 (ddd)');

export const formatToYYYYMMDD = date => moment(date).format('YYYYMMDD');

export const isLunchQtyChangeDisabled = date => {
  if (date >= today) {
    const timeStamp = moment();
    const endTime = moment(`${date} 0930`, 'YYYYMMDD hhmm');

    if (timeStamp.isBefore(endTime)) {
      return false;
    }
    return true;
  }
  return true;
};

export const isDinnerQtyChangeDisabled = date => {
  if (date >= today) {
    const timeStamp = moment();
    const endTime = moment(`${date} 1330`, 'YYYYMMDD hhmm');

    if (timeStamp.isBefore(endTime)) {
      return false;
    }
    return true;
  }
  return true;
};
