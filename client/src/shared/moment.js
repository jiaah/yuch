import * as moment from 'moment';

export const today = moment({ hour: 5, minute: 20 }).format('YYYY-MM-DD');
export const tommrow = moment()
  .startOf('day')
  .add(1, 'day')
  .format('YYYY-MM-DD');
