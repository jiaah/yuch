import { Axios } from './axios';
import * as types from './actionTypes';

export const getEmployees = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getEmployees' });
  try {
    const res = await Axios.get('/partner/employees');

    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getEmployees',
    });
    return res.data;
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
    dispatch({ type: types.HTTP_SUCCESS, api: 'createEmployee' });
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
    dispatch({ type: types.HTTP_SUCCESS, api: 'editEmployee' });
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
    dispatch({ type: types.HTTP_SUCCESS, api: 'deleteEmployee' });
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
