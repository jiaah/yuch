import moment from 'moment';

export const today = moment().format('YYYY-MM-DD');
export const todayInKorean = moment().format('YYYY 년 MM 월 DD 일');
export const dateInKorean = moment().format('MM 월 DD 일 (ddd)');

export const thisMonth = moment().format('YYYY / MM');
export const nextMonth = moment()
  .add(1, 'months')
  .format('YYYY / MM');
export const inTwoMonths = moment()
  .add(2, 'months')
  .format('YYYY / MM');

export const inThreeDays = moment()
  .add(3, 'day')
  .format('YYYY-MM-DD');

export const timeToNow = moment().toNow();
export const timeStamp = moment().format('MMMM DD YYYY, h:mm a');
