import { Axios } from './axios';
import * as types from './actionTypes';

export const getUsersInvoice = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsersInvoice' });
  try {
    const res = await Axios.get('/invoice/users', { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getUsersInvoice' });
    return res.data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUsersInvoice',
      status: error.response.status,
      error: 'Getting Users Invoice failed.',
    });
  }
};

export const updateUsersInvoice = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateUsersInvoice' });
  try {
    const res = await Axios.patch('/invoice/users', { date });
    dispatch({ type: types.HTTP_SUCCESS, api: 'updateUsersInvoice' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateUsersInvoice',
      status: error.response.status,
      error: 'Updating Users Invoice failed.',
    });
  }
};

export const getUserInvoice = (id, date) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUserInvoice' });
  try {
    const res = await Axios.get(`/invoice/user/${id}`, { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getUserInvoice' });
    return res.data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getUserInvoice',
      status: error.response.status,
      error: 'Getting User Invoice failed.',
    });
  }
};

export const getRevenue = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getRevenue' });
  try {
    const res = await Axios.get('/revenue', { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getRevenue' });
    return res.data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getRevenue',
      status: error.response.status,
      error: 'Getting Revenue failed.',
    });
  }
};

export const getYuchRevenue = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getYuchRevenue' });
  try {
    const res = await Axios.get('/revenue/yuch', { params: { date } });
    dispatch({ type: types.HTTP_SUCCESS, api: 'getYuchRevenue' });
    return res.data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getYuchRevenue',
      status: error.response.status,
      error: 'Getting YuchRevenue failed.',
    });
  }
};
