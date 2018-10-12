import moment from './moment';

export const tommrow = moment()
  .startOf('day')
  .add(1, 'day')
  .format('YYYY-MM-DD');

export const now = moment().format('MMMM Do YYYY, h:mm a');

export const reserveInitState = {
  reserve: {
    name: '',
    contact: '(0  )    -    ',
    number: '',
    place: '',
    date: tommrow,
    time: '12:30',
  },
  show: false,
  loading: false,
  apiRequest: '',
  error: '',
};

export const reserveUpdatedState = {
  reserve: {
    name: 'Jiah Lee',
    contact: '(010)2542-1222',
    number: '60',
    place: '경주 교회',
    date: '2019-11-11',
    time: '1:30 PM',
  },
  show: true,
  loading: false,
  apiRequest: 'success',
  error: '',
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

export const reserveInfoInit = {
  name: '',
  contact: '(0  )    -    ',
  number: '',
  place: '',
  date: tommrow,
  time: '12:30',
};
