import moment from 'moment';
import { today } from '../helpers/moment';

export const dayBefore = date =>
  moment(date, 'YYYYMMDD')
    .add(-1, 'days')
    .format('YYYYMMDD');

export const dayAfter = date =>
  moment(date, 'YYYYMMDD')
    .add(1, 'days')
    .format('YYYYMMDD');

export const weekBefore = date =>
  moment(date, 'YYYYMMDD')
    .add(-7, 'days')
    .format('YYYYMMDD');

export const weekAfter = date =>
  moment(date, 'YYYYMMDD')
    .add(7, 'days')
    .format('YYYYMMDD');

export const monthBefore = date =>
  moment(date, 'YYYYMMDD')
    .add(-1, 'months')
    .format('YYYYMMDD');

export const monthAfter = date =>
  moment(date, 'YYYYMMDD')
    .add(1, 'months')
    .format('YYYYMMDD');

export const yearBefore = date =>
  moment(date, 'YYYYMMDD')
    .add(-1, 'years')
    .format('YYYYMMDD');

export const yearAfter = date =>
  moment(date, 'YYYYMMDD')
    .add(1, 'years')
    .format('YYYYMMDD');

const lastMonth = moment()
  .add(-1, 'months')
  .format('YYYYMM');

export const firstDayOfLastMonth = () => {
  const value = `${lastMonth}01`;
  return value;
};

export const firstDayOfYYYYMMDD = date => {
  const parsedDate = moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYYMM');
  const formattedDate = `${parsedDate}01`;
  return formattedDate;
};

export const formatToDateForm = date =>
  moment(date).format('MM 월 DD 일 (ddd)');

export const formatToMonthDateForm = date =>
  moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYY 년 MM 월');

export const formatToDayDateForm = date =>
  moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYY 년 MM 월 DD 일');

export const formatToYearDateForm = date =>
  moment(date, 'YYYYMMDD').format('YYYY 년');

export const formatToTimeForm = time =>
  moment(time, 'hh:mm').format('hh 시 mm 분');

export const formatToYYYY = date =>
  moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYY');

export const formatToYYYYMM = date =>
  moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYYMM');

export const formatToYYYYMMDD = date =>
  moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYYMMDD');

export const formatWithDash = date =>
  moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYY-MM-DD');

export const formatWithSlash = date =>
  moment(date, ['YYYYMMDD', 'YYYY-MM-DD']).format('YYYY/MM/DD');

export const invoiceFormat = value => {
  const date = moment(value, ['YYYYMMDD', 'YYYY-MM-DD']).format('DD');
  const day = moment(value, ['YYYYMMDD', 'YYYY-MM-DD']).format('ddd');
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
    const endTime = moment(`${date} 1400`, 'YYYYMMDD hhmm');

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
  const formattedEndDate = formatWithDash(endDate);
  const today = moment().format('YYYY-MM-DD');

  const isActive = moment(today, 'YYYY-MM-DD').isBetween(
    formattedStartDate,
    formattedEndDate,
    'days',
    '[)',
  );
  return isActive;
};

export const isThisMonth = (startDate, endDate) => {
  const today = moment().format('YYYY-MM-DD');
  const isActive = moment(today, 'YYYY-MM-DD').isBetween(
    startDate,
    endDate,
    'months',
    '[]',
  );
  return isActive;
};
