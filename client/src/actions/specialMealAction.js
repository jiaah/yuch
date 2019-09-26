import { Axios } from './axios';
import * as types from './actionTypes';

export const getSpecialMeal = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getSpecialMeal' });
  try {
    const res = await Axios.get('/special/users', { params: { date } });
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getSpecialMeal',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateSpecialMeal',
      status: error.response.status,
      error: 'Updating SpecialMeal failed.',
    });
  }
};

export const createSpecialMeal = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createSpecialMeal' });
  try {
    const res = await Axios.post('/special', values);
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'createSpecialMeal',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createSpecialMeal',
      status: error.response.status,
      error: 'Creating SpecialMeal failed.',
    });
  }
};

export const updateSpecialMeal = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateSpecialMeal' });
  try {
    const res = await Axios.patch(`/special/${values.id}`, values);
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'updateSpecialMeal',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateSpecialMeal',
      status: error.response.status,
      error: 'Updating SpecialMeal failed.',
    });
  }
};

export const deleteSpecialMeal = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteSpecialMeal' });
  try {
    const res = await Axios.delete(`/special/user/${id}`);

    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'deleteSpecialMeal',
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteSpecialMeal',
      status: error.response.status,
      error: 'Deleting SpecialMeal failed.',
    });
  }
};
