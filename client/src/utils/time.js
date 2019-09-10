import moment from 'moment';

export const convertToExpireTokenTime = expiresIn => {
  const accessTokenExpireTime = moment()
    .add(parseInt(expiresIn, 10), 'milliseconds')
    .format('YYYYMMDDhhmm');
  return accessTokenExpireTime;
};

export const calculateExpireTime = (time, period, unit) => {
  const expireTime = moment(time)
    .add(period, unit)
    .format('YYYYMMDDhhmm');
  return expireTime;
};
