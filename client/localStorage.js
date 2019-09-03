import { calculateExpireTime } from './src/utils/expireTime';

export const getToken = () => localStorage.token;
export const getRefreshToken = () => localStorage.refreshToken;
export const getExpireTime = () => localStorage.expireTime;
export const isLoggedIn = () => !!localStorage.token;
export const saveToken = (token, expiresIn) => {
  const expireTime = calculateExpireTime(expiresIn);
  localStorage.setItem('token', token);
  localStorage.setItem('expireTime', expireTime);
};
export const saveUserTokens = (tokenData, keepUserLoggedIn) => {
  const { token, expiresIn, refreshToken } = tokenData;
  saveToken(token, expiresIn);
  localStorage.setItem('refreshToken', refreshToken);
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
