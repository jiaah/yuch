import moment from 'moment';

export const todayInKorean = moment().format('YYYY 년 MM 월 DD 일');
export const dateInKorean = moment().format('MM 월 DD 일 (ddd)');

export const timeStamp = moment().format('YYYY-MM-DD, h:mm a');
export const formattedToday = moment().format('YYYY-MM-DD');
// export const timeToNow = moment().toNow();

// reserve mealPrice date
export const thisMonth = moment().format('YYYY/MM');
export const nextMonth = moment()
  .add(1, 'months')
  .format('YYYY/MM');
export const inTwoMonths = moment()
  .add(2, 'months')
  .format('YYYY/MM');

// reservation
export const inThreeDays = moment()
  .add(3, 'day')
  .format('YYYY-MM-DD');
export const timeToNumber = moment().format('YYYYMMDDhhmm');

// user catering
export const today = moment().format('YYYYMMDD');
export const inAWeek = moment()
  .add(7, 'days')
  .format('YYYYMMDD');
