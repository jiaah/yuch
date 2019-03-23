import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const userSignup = (
  companyName,
  username,
  contactNumber,
) => dispatch => {
  axios
    .post(`${API_HOST}/auth/signup`, {
      companyName,
      username,
      contactNumber,
    })
    .catch(err => console.log(err));
};

export const userLogin = (username, password) => dispatch => {
  axios
    .post(`${API_HOST}/auth/login`, { username, password })
    .then(res => console.log(res, res.token))
    .catch(err => console.log(err));
};

export const userLogout = () => () => {};
