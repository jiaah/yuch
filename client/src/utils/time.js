import moment from 'moment';

export const dayBefore = date =>
  moment(date)
    .add(-1, 'days')
    .format('YYYY-MM-DD');

export const dayAfter = date =>
  moment(date)
    .add(1, 'days')
    .format('YYYY-MM-DD');
