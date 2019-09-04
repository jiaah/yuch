import {
  convertToExpireTokenTime,
  calculateExpireTime,
} from './src/utils/time';
import { timeStamp } from './src/helpers/moment';

// access token
export const isLoggedIn = () => !!localStorage.token;
export const getToken = () => localStorage.token;
export const getExpireTime = () => localStorage.expireTime;
export const saveToken = (token, expiresIn) => {
  const expireAccessTokenTime = convertToExpireTokenTime(expiresIn);
  localStorage.setItem('token', token);
  localStorage.setItem('expireTime', expireAccessTokenTime);
};

// refresh token
export const getRefreshToken = () => localStorage.refreshToken;
export const getRefreshTokenRenewTime = () =>
  localStorage.refreshTokenRenewTime;
export const saveRefreshToken = refreshToken => {
  const renewTime = calculateExpireTime(timeStamp, 2, 'minutes');
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('refreshTokenRenewTime', renewTime);
};

// save tokens
export const saveUserTokens = (tokenData, keepUserLoggedIn) => {
  const { token, expiresIn, refreshToken } = tokenData;
  saveToken(token, expiresIn);
  saveRefreshToken(refreshToken);
  // keepUserLoggedIn state is always saved in localStorage (thanks to redux-persist) regardless of user's choice.
  // save keepUserLoggedIn state in session storage to prevent from logging out a user on refresh.
  // (check routes/authGuards.js)
  return !keepUserLoggedIn
    ? sessionStorage.setItem('keepUserLoggedIn', keepUserLoggedIn)
    : null;
};

export const clearStorage = () => {
  localStorage.clear();
  return sessionStorage.clear();
};
