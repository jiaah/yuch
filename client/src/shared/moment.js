import moment from 'moment';

export const today = moment().format('YYYY-MM-DD');
export const inThreeDays = moment()
  .startOf('day')
  .add(3, 'day')
  .format('YYYY-MM-DD');
export const timeToNow = moment().toNow();
export const timeStamp = moment().format('MMMM Do YYYY, h:mm a');
