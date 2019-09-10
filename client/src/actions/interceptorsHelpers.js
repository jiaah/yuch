import { Axios } from './axios';
import {
  getRefreshToken,
  getExpireTime,
  saveToken,
  saveRefreshToken,
} from '../../localStorage';
import { timeToNumber } from '../helpers/moment';
import { history } from '../../history';

const expireTime = getExpireTime();

export const isTokenExpiredError = error => {
  const { response: errorResponse } = error;
  const originalRequest = error.config;
  console.log('errorResponse: ', errorResponse);
  console.log('originalRequest._retry: ', originalRequest._retry);
  console.log('!originalRequest._retry: ', !originalRequest._retry);

  if (errorResponse.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return true;
  }
  // if (expireTime < timeToNumber) {
  //   return true;
  // }
  return false;
};

export const resetTokenAndReattemptRequest = async error => {
  const { response: errorResponse } = error;
  const originalRequest = error.config;
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return Promise.reject(error);
  }
  try {
    const res = await Axios.post('/auth/refresh', {
      refreshToken,
    });
    const newRefreshToken = res.data.refreshToken;
    const newToken = res.headers.authorization.split(' ')[1];

    // update refreshToken if it's renewed.
    if (newRefreshToken !== refreshToken) {
      saveRefreshToken(newRefreshToken);
    }
    if (!newToken) {
      return Promise.reject(error);
    }

    // save token to localStorage
    await saveToken(newToken);
    // change authorization header
    errorResponse.config.headers.authorization = `Bearer ${newToken}`;
    // return originalRequest object with Axios
    // return Axios(errorResponse.config);
    return Axios(originalRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};
