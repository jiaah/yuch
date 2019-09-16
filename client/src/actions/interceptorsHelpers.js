import { Axios } from './axios';
import {
  getRefreshToken,
  saveToken,
  saveRefreshToken,
} from '../../localStorage';

export const isTokenExpiredError = (error, interceptor) => {
  console.log('check if it is a Token Expired Error');
  const status = error.response ? error.response.status : null;
  const originalRequest = error.config;
  console.log(
    'status === 401 && !originalRequest._retry: ',
    status === 401 && !originalRequest._retry,
  );
  if (status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return true;
  }

  // to stop going in an infinite loop.
  Axios.interceptors.response.eject(interceptor);
  return Promise.reject(error);
};

export const resetTokenAndReattemptRequest = async error => {
  console.log('token is expired');
  const originalRequest = error.config;
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return Promise.reject(error);
  }
  try {
    const res = await Axios.post('/auth/refresh', {
      refreshToken,
    });
    console.log('refreshToken: ', refreshToken);
    const newRefreshToken = res.data.refreshToken;
    console.log('newRefreshToken: ', newRefreshToken);
    const newToken = res.headers.authorization.split(' ')[1];
    console.log('newToken: ', newToken);

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
