import axios from 'axios';
import { API_HOST } from '../../config';
import { getToken } from '../../localStorage';

const token = getToken();

export const Axios = axios.create({
  baseURL: API_HOST,
  timeout: 1000,
  headers: {
    authorization: `Bearer ${token}`,
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});
