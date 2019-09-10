import { Axios } from './axios';
import {
  getRefreshToken,
  saveToken,
  saveRefreshToken,
} from '../../localStorage';
import { API_HOST } from '../../config';

export const isTokenExpiredError = (error, interceptor) => {
  const status = error.response ? error.response.status : null;
  const originalRequest = error.config;

  // Reject promise if usual error
  if (status !== 401) {
    return Promise.reject(error);
  }
  // to stop going in an infinite loop when refreshToken is invalid.
  if (status === 401 && originalRequest.url === `${API_HOST}/auth/refresh`) {
    Axios.interceptors.response.eject(interceptor);
    return Promise.reject(error);
  }

  if (status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return true;
  }

  return false;
};

export const resetTokenAndReattemptRequest = async error => {
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
    Axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;

    // return originalRequest object with Axios
    return Axios(originalRequest);
  } catch (error) {
    return Promise.reject(error);
  }
};
