import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const userSignup = (
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
  console.log(res);
};

export const userLogin = (username, password) => async dispatch => {
  const res = await axios.post(`${API_HOST}/auth/login`, {
    username,
    password,
  });
  console.log(res);
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get(`${API_HOST}/auth/current_user`);
  dispatch({ type: types.FETCH_USER, payload: res.data });
  console.log('res.data: ', res.data);
};
export const userLogout = () => () => {};
