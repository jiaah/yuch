import axios from 'axios';
import { API_HOST } from '../../config';
import { getToken, saveUserToken } from '../../localStorage';

const token = getToken();

export const Axios = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    authorization: `Bearer ${token}`,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

const isTokenExpiredError = errorResponse => {
  if (errorResponse.data === 'Unauthorized access') {
    return true;
  }
};

const resetTokenAndReattemptRequest = async error => {
  try {
    const res = await Axios.post('/auth/refresh');
    // need to receive expiredIn value from server.
    const { token } = res.data;
    if (!token) {
      return Promise.reject(error);
    }
    const retryOriginalRequest = () => {
      resolve(axios(errorResponse.config));
    };

    const tokenData = { token, expiresIn: '60' };

    await saveUserToken(tokenData, undefined);
    return retryOriginalRequest;
  } catch (err) {
    Promise.reject(error);
  }
};
Axios.interceptors.response.use(
  response =>
    // If the request succeeds, we don't have to do anything and just return the response
    response,
  async error => {
    const errorResponse = error.response;
    if (isTokenExpiredError(errorResponse)) {
      return resetTokenAndReattemptRequest(error);
    }
    return Promise.reject(error);
  },
);
