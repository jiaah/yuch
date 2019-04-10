import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const createUser = userInfo => async dispatch => {
  console.log('CREATE USER API HAS BEEN CALLED');
  dispatch({ type: types.HTTP_REQUEST });
  try {
    const res = await axios.post(`${API_HOST}/auth/register`, { userInfo });
    const companyName = res.data;
    dispatch({ type: types.HTTP_SUCCESS });
    return companyName;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, error });
  }
};

export const userLogin = (username, password) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'login' });
  try {
    const res = await axios.post(`${API_HOST}/auth/login`, {
      username,
      password,
    });
    const token = res.data.token;
    dispatch({ type: types.HTTP_SUCCESS, api: 'login' });
    return token;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'login', error });
  }
};
