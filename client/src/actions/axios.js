import axios from 'axios';
import { API_HOST } from '../../config';
import {
  getToken,
  getRefreshToken,
  saveToken,
  getExpireTime,
} from '../../localStorage';
import { timeToNumbers } from '../helpers/moment';

const token = getToken();
const expireAccessTokenTime = getExpireTime();
const timeStamp = timeToNumbers;

// create axios instance
export const Axios = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

Axios.interceptors.response.use(
  response =>
    // If the request succeeds, we don't have to do anything and just return the response
    response,
  async error => {
    if (isTokenExpiredError()) {
      return resetTokenAndReattemptRequest(error);
    }
    return Promise.reject(error);
  },
);

const isTokenExpiredError = () => {
  if (expireAccessTokenTime <= timeStamp) {
    return true;
  }
  if (expireAccessTokenTime > timeStamp) {
    return false;
  }
};

const resetTokenAndReattemptRequest = async error => {
  try {
    const { response: errorResponse } = error;

    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return Promise.reject(error);
    }

    // obtain new access token (correct route when server is ready)
    const res = await Axios.post('/auth/refresh', {
      refreshToken,
    });
    const newToken = res.data.token;
    const expiresIn = '120000';

    if (!newToken) {
      return Promise.reject(error);
    }

    await saveToken(newToken, expiresIn);
    errorResponse.config.headers.authorization = `Bearer ${newToken}`;
    return axios(errorResponse.config);
  } catch (err) {
    Promise.reject(error);
  }
};
