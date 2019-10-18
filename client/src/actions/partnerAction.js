import { Axios } from './axios';
import * as types from './actionTypes';

/* --- Employees --- */
export const getEmployees = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getEmployees' });
  try {
    const res = await Axios.get('/partner/employees');
    const { data } = res;
    dispatch({
      type: types.FETCH_DATA,
      api: 'getEmployees',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getEmployees',
      status: error.response.status,
      error: 'Getting Employees is failed.',
    });
  }
};

export const createEmployee = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createEmployee' });
  try {
    const res = await Axios.post('/partner/employee', values);
    dispatch({
      type: types.UPDATE_DATA,
      api: 'createEmployee',
      payload: values,
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createEmployee',
      status: error.response.status,
      error: 'Creating Employee is failed.',
    });
  }
};

export const editEmployee = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editEmployee' });
  try {
    const res = await Axios.patch(`/partner/employee/${values.id}`, values);
    dispatch({
      type: types.UPDATE_DATA,
      api: 'editEmployee',
      payload: values,
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editEmployee',
      status: error.response.status,
      error: 'Editing Employee is failed.',
    });
  }
};

export const deleteEmployee = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteEmployee' });
  try {
    const res = await Axios.delete(`/partner/employee/${id}`);
    dispatch({
      type: types.DELETE_DATA,
      api: 'deleteEmployee',
      payload: { id },
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteEmployee',
      status: error.response.status,
      error: 'Deleting Employee is failed.',
    });
  }
};

/* --- Partners --- */

export const getPartners = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getPartners' });
  try {
    const res = await Axios.get('/partner/business');
    const { data } = res;
    dispatch({
      type: types.FETCH_DATA,
      api: 'getPartners',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getPartners',
      status: error.response.status,
      error: 'Getting Partners is failed.',
    });
  }
};

export const createPartner = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createPartner' });
  try {
    const res = await Axios.post('/partner/business', values);
    dispatch({
      type: types.UPDATE_DATA,
      api: 'createPartner',
      payload: values,
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createPartner',
      status: error.response.status,
      error: 'Creating Partner is failed.',
    });
  }
};

export const editPartner = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editPartner' });
  try {
    const res = await Axios.patch(`/partner/business/${values.id}`, values);
    dispatch({
      type: types.UPDATE_DATA,
      api: 'editPartner',
      payload: values,
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editPartner',
      status: error.response.status,
      error: 'Editing Partner is failed.',
    });
  }
};

export const deletePartner = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deletePartner' });
  try {
    const res = await Axios.delete(`/partner/business/${id}`);
    dispatch({
      type: types.DELETE_DATA,
      api: 'deletePartner',
      payload: { id },
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deletePartner',
      status: error.response.status,
      error: 'Deleting Partner is failed.',
    });
  }
};
