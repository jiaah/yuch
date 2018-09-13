import * as moment from 'moment';

export const today = moment().format('MMMM Do YYYY, h:mm a');
export const tommrow = moment()
  .startOf('day')
  .add(1, 'day')
  .format('YYYY-MM-DD');
export const timeToNow = moment().toNow();
