import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const requestSignup = (
  companyName,
  username,
  password,
  contactNumber,
) => async dispatch => {
  const res = await axios.post(`${API_HOST}/auth/register`, {
    companyName,
    username,
    password,
    contactNumber,
  });
  return res.data;
};

export const requestLogin = (username, password) => async dispatch => {
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
