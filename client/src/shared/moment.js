import moment from 'moment';

moment.locale('kr');

export const today = moment().format('YYYY-MM-DD');
export const todayInKorean = moment().format('YYYY 년 MM 월 DD 일');

export const thisMonth = moment().format('YYYY 년 M 월');
export const nextMonth = moment()
  .add(1, 'months')
  .format('YYYY 년 M 월');
export const inTwoMonths = moment()
  .add(2, 'months')
  .format('YYYY 년 M 월');

export const inThreeDays = moment()
  .startOf('day')
  .add(3, 'day')
  .format('YYYY-MM-DD');

export const timeToNow = moment().toNow();
export const timeStamp = moment().format('MMMM Do YYYY, h:mm a');
