import axios from 'axios';
import { API_HOST } from '../../config';
import {
  getToken,
  getRefreshToken,
  saveToken,
  saveRefreshToken,
} from '../../localStorage';

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

// const isTokenExpiredError = error => {
//   const { response: errorResponse } = error;
//   if (errorResponse.status === 401) return true;
//   return false;
// };

// const resetTokenAndReattemptRequest = async error => {
//   try {
//     const { response: errorResponse } = error;

//     const refreshToken = await getRefreshToken();
//     if (!refreshToken) {
//       return Promise.reject(error);
//     }

//     const res = await Axios.post('/auth/token', {
//       refreshToken,
//     });
//     const newRefreshToken = res.data.refreshToken;
//     const newToken = res.headers.authorization.split(' ')[1];

//     // update refreshToken if it's renewed.
//     if (newRefreshToken !== refreshToken) {
//       saveRefreshToken(newRefreshToken);
//     }
//     if (!newToken) {
//       return Promise.reject(error);
//     }
//     await saveToken(newToken);
//     // re-attempt api request
//     errorResponse.config.headers.authorization = `Bearer ${newToken}`;
//     return axios(errorResponse.config);
//   } catch (err) {
//     Promise.reject(error);
//   }
// };
