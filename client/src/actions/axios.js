/* eslint-disable no-param-reassign */
import axios from 'axios';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';
import {
  isTokenExpiredError,
  resetTokenAndReattemptRequest,
} from './interceptorsHelpers';

// create axios instance
export const Axios = axios.create({
  baseURL: API_HOST,
  timeout: 10000, // 10s timeout for requests
});

Axios.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => Promise.reject(error),
);

let interceptor = null;
const responseInterceptor = () => {
  interceptor = Axios.interceptors.response.use(
    response =>
      // If the request succeeds, we don't have to do anything and just return the response
      response,
    async error => {
      const status = error.response ? error.response.status : null;
      const originalRequest = error.config;

      // to stop going in an infinite loop when refreshToken is invalid.
      if (
        status === 401 &&
        originalRequest.url === `${API_HOST}/auth/refresh`
      ) {
        Axios.interceptors.response.eject(interceptor);
        return Promise.reject(error);
      }

      if (isTokenExpiredError(error)) {
        return resetTokenAndReattemptRequest(error);
      }

      return Promise.reject(error);
    },
  );
  return interceptor;
};
responseInterceptor();
