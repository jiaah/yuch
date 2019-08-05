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
    });
    return bankAccount;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getBankAccount',
      error: 'Getting the bank account list is failed.',
    });
  }
};

export const createBankAccount = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createBankAccount' });
  try {
    await axios.post(`${API_HOST}/admin/bankaccount`, values);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'createBankAccount' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createBankAccount',
      error: 'Creating the bank account is failed.',
    });
  }
};

export const editBankAccount = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editBankAccount' });
  try {
    await axios.patch(`${API_HOST}/admin/bankaccount/${values.id}`, values);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'editBankAccount' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editBankAccount',
      error: 'Editing the bank account is failed.',
    });
  }
};

export const deleteBankAccount = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteBankAccount' });
  try {
    await axios.delete(`${API_HOST}/admin/bankaccount/${id}`);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'deleteBankAccount' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteBankAccount',
      error: 'Deleting the bank account is failed.',
    });
  }
};
