import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const requestSignup = userInfo => async dispatch => {
  console.log('SIGNUP ACTION FUNCTION HAS CALLED');
  const res = await axios.post(`${API_HOST}/auth/register`, {
    userInfo,
  });
  return res.data;
};

export const requestLogin = (username, password) => async dispatch => {
  console.log('LOGIN ACTION FUNCTION HAS CALLED');
  const res = await axios.post(`${API_HOST}/auth/login`, {
    username,
    password,
  });
  return res.data.token;
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${API_HOST}/auth/current_user`);
  dispatch({ type: types.FETCH_USER, payload: res.data });
};
export const requestLogout = () => () => {};
