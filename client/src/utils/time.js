import moment from 'moment';

export const convertToExpireTokenTime = expiresIn => {
  const expireAccessTokenTime = moment()
    .add(parseInt(expiresIn, 10), 'milliseconds')
    .format('YYYYMMDDhhmm');
  return expireAccessTokenTime;
};

export const calculateExpireTime = (time, period, unit) => {
  const expireTime = moment([time, 'MMMM DD YYYY, h:mm a'])
    .add(period, unit)
    .format('YYYYMMDDhhmm');
  return expireTime;
};
