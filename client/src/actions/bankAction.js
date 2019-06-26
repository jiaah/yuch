import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const getBankAccount = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getBankAccount' });
  try {
    const res = await axios.get(`${API_HOST}/admin/bankaccount`);
    const bankAccount = res.data;
    console.log('bankAccount: ', bankAccount);
  } catch (err) {
    console.log(err);
  }
};
