import moment from 'moment';

export const calculateExpireTime = expiresIn => {
  const expireTime = moment()
    .add(parseInt(expiresIn, 10), 'milliseconds')
    .format('YYYYMMDDhhmm');
  return expireTime;
};
