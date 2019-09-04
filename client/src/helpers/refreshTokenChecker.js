import { timeToNumbers, timeStamp } from './moment';
import { calculateExpireTime } from '../utils/time';

// ['YYYYMMDDhhmm'] timeToNumbers, expireTime, refreshTokenRenewTime
// ['MMMM DD YYYY, h:mm a'] timeStamp

export const wasUserAwayForWeeks = accessTokenExpireTime => {
  const expireTime = calculateExpireTime(timeStamp, -14, 'days');
  if (accessTokenExpireTime <= expireTime) return true;
  return false;
};

export const isRefreshTokenOld = refreshTokenRenewTime => {
  if (refreshTokenRenewTime <= timeToNumbers) return true;
  return false;
};
