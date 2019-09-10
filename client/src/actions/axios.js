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
  timeout: 1000,
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

Axios.interceptors.response.use(
  response =>
    // If the request succeeds, we don't have to do anything and just return the response
    response,
  async error => {
    // const originalRequest = error.config;
    if (isTokenExpiredError(error)) {
      return resetTokenAndReattemptRequest(error);
    }
    return Promise.reject(error);
  },
);
