import { Axios } from './axios';
import * as types from './actionTypes';

export const getBankAccount = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getBankAccount' });
  try {
    const res = await Axios.get('/admin/bankaccount');
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
      status: error.response.status,
      error: 'Getting the bank account list is failed.',
    });
  }
};

export const createBankAccount = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createBankAccount' });
  try {
    await Axios.post('/admin/bankaccount', values);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'createBankAccount' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createBankAccount',
      status: error.response.status,
      error: 'Creating the bank account is failed.',
    });
  }
};

export const editBankAccount = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editBankAccount' });
  try {
    await Axios.patch(`/admin/bankaccount/${values.id}`, values);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'editBankAccount' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editBankAccount',
      status: error.response.status,
      error: 'Editing the bank account is failed.',
    });
  }
};

export const deleteBankAccount = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteBankAccount' });
  try {
    await Axios.delete(`/admin/bankaccount/${id}`);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'deleteBankAccount' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteBankAccount',
      status: error.response.status,
      error: 'Deleting the bank account is failed.',
    });
  }
};
