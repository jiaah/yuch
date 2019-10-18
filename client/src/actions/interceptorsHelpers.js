import { Axios } from './axios';
import {
  getRefreshToken,
  saveToken,
  saveRefreshToken,
} from '../../localStorage';

export const isTokenExpiredError = error => {
  const status = error.response ? error.response.status : null;
  const originalRequest = error.config;

  if (status === 401 && !originalRequest._retry) {
    return true;
  }
};

export const resetTokenAndReattemptRequest = async error => {
  const originalRequest = error.config;
  const refreshToken = await getRefreshToken();

  originalRequest._retry = true;

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
    Axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
    // return originalRequest object with Axios
    return Axios(originalRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};
