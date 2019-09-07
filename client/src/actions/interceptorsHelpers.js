import { Axios } from './axios';
import {
  getRefreshToken,
  saveToken,
  saveRefreshToken,
} from '../../localStorage';
import { history } from '../../history';

export const isTokenExpiredError = error => {
  const { response: errorResponse } = error;
  if (errorResponse.status === 401) return true;
  return false;
};

export const resetTokenAndReattemptRequest = async error => {
  try {
    const { response: errorResponse } = error;

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return history.push('/login');
    }

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
    await saveToken(newToken);
    // re-attempt api request
    errorResponse.config.headers.authorization = `Bearer ${newToken}`;
    return axios(errorResponse.config);
  } catch (err) {
    Promise.reject(error);
  }
};
