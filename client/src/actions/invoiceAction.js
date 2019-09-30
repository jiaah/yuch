import { Axios } from './axios';
import * as types from './actionTypes';

export const getUsersInvoice = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsersInvoice' });
  try {
    const res = await Axios.get('/invoice/users', { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getUsersInvoice' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUsersInvoice',
      error: 'Getting Users Invoice failed.',
    });
  }
};

export const updateUsersInvoice = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsersInvoice' });
  try {
    const res = await Axios.patch('/invoice/users', date);
    dispatch({ type: types.HTTP_SUCCESS, api: 'getUsersInvoice' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUsersInvoice',
      error: 'Getting Users Invoice failed.',
    });
  }
};

export const getUserInvoice = (id, date) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUserInvoice' });
  try {
    const res = await Axios.get(`/invoice/user/${id}`, { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getUserInvoice' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUserInvoice',
      error: 'Getting User Invoice failed.',
    });
  }
};

export const getRevenue = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getRevenue' });
  try {
    const res = await Axios.get('/revenue', { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getRevenue' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getRevenue',
      error: 'Getting Revenue failed.',
    });
  }
};

export const getYuchRevenue = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getYuchRevenue' });
  try {
    const res = await Axios.get('/revenue/yuch', { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getYuchRevenue' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getYuchRevenue',
      error: 'Getting YuchRevenue failed.',
    });
  }
};
