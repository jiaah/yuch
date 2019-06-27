import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const getBankAccount = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getBankAccount' });
  try {
    const res = await axios.get(`${API_HOST}/admin/bankaccount`);
    const bankAccount = res.data;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getBankAccount',
      payload: { bankAccount },
    });
    return bankAccount;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'getBankAccount', error });
    throw new Error('Getting the bank account list is failed.');
  }
};

export const createBankAccount = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createBankAccount' });
  try {
    const res = await axios.post(`${API_HOST}/admin/bankaccount`, values);
    return res;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'createBankAccount', error });
    throw new Error('Creating the bank account is failed.');
  }
};
