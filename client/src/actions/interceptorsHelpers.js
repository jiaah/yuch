import { Axios } from './axios';
import {
  getRefreshToken,
  saveToken,
  saveRefreshToken,
} from '../../localStorage';

export const isTokenExpiredError = error => {
  const { response: errorResponse } = error;
  if (errorResponse.status === 401) return true;
  return false;
};

export const resetTokenAndReattemptRequest = async error => {
  const { response: errorResponse } = error;
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return Promise.reject(error);
  }
  try {
    const res = await Axios.post('/auth/refresh', {
      refreshToken,
    });
    console.log('res: ', res);
    const newRefreshToken = res.data.refreshToken;
    const newToken = res.headers.authorization.split(' ')[1];
    // update refreshToken if it's renewed.
    if (newRefreshToken !== refreshToken) {
      saveRefreshToken(newRefreshToken);
    }
    if (!newToken) {
      return Promise.reject(error);
    }
    await saveToken(newToken);
    // re-attempt api request
    errorResponse.config.headers.authorization = `Bearer ${newToken}`;
    return Axios(errorResponse.config);
  } catch (error) {
    console.log('error: ', error);
    return Promise.reject(error);
  }
};
