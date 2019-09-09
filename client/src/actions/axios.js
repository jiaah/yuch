import axios from 'axios';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';
import {
  isTokenExpiredError,
  resetTokenAndReattemptRequest,
} from './interceptorsHelpers';

const token = getToken();

// create axios instance
export const Axios = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    authorization: `Bearer ${token}`,
  },
});

// Axios.interceptors.response.use(
//   response =>
//     // If the request succeeds, we don't have to do anything and just return the response
//     response,
//   async error => {
//     if (isTokenExpiredError(error)) {
//       return resetTokenAndReattemptRequest(error);
//     }
//     return Promise.reject(error);
//   },
// );
