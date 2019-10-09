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

export const monthBefore = date =>
  moment(date)
    .add(-1, 'months')
    .format('YYYYMMDD');

export const monthAfter = date =>
  moment(date)
    .add(1, 'months')
    .format('YYYYMMDD');

export const yearBefore = date =>
  moment(date)
    .add(-1, 'years')
    .format('YYYYMMDD');

export const yearAfter = date =>
  moment(date)
    .add(1, 'years')
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

export const formatToMonthDateForm = date =>
  moment(date, 'YYYYMMDD').format('YYYY 년 MM 월');

export const formatToYearDateForm = date =>
  moment(date, 'YYYYMMDD').format('YYYY 년');

export const formatToYYYY = date => moment(date).format('YYYY');
export const formatToYYYYMM = date => moment(date).format('YYYYMM');
export const formatToYYYYMMDD = date => moment(date).format('YYYYMMDD');
export const formatWithDash = date => moment(date).format('YYYY-MM-DD');
export const formatWithSlash = date => moment(date).format('YYYY/MM/DD');

export const invoiceFormat = value => {
  const date = moment(value).format('DD');
  const day = moment(value).format('ddd');
  return { date, day };
};
export const formatSlashToYYMM = date =>
  moment(date, 'YYYY/MM').format('YYYYMM');

export const revenueFormat = date => moment(date, 'YYYYMM').format('MM');

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

export const selectOptionsYYYYMM = arr =>
  arr.map(i => {
    const date = moment()
      .add(i, 'months')
      .format('YYYY/MM');
    return { value: date };
  });

export const userEndDate = (data, limitedDate) => {
  let endDate;
  if (data && data.endDate <= limitedDate) {
    endDate = data.endDate;
  } else {
    endDate = limitedDate;
  }
  return endDate;
};

export const isActiveUser = (startDate, endDate) => {
  const formattedStartDate = formatWithDash(startDate);
  const today = moment().format('YYYY-MM-DD');
  const isActive = moment(today).isBetween(formattedStartDate, endDate, 'days');
  return isActive;
};
