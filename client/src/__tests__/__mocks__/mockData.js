import moment from './moment';

export const inThreeDays = moment()
  .startOf('day')
  .add(3, 'day')
  .format('YYYY-MM-DD');

export const now = moment().format('MMMM Do YYYY, h:mm a');

export const reserveInitState = {
  loading: false,
  apiRequest: null,
  error: '',
};

export const reserveUpdatedState = {
  loading: false,
  apiRequest: 'success',
  error: '',
};

export const reserveInfoInit = {
  name: '',
  contact: '(0  )    -    ',
  number: '',
  place: '',
  date: inThreeDays,
  time: '12:30',
};

export const reserveInfo = {
  name: 'Jiah Lee',
  contact: '(010)2542-1222',
  number: '60',
  place: '경주 교회',
  date: '2019-11-11',
  time: '12:30',
  createdAt: now,
};
