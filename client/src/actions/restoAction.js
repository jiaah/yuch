import { Axios } from './axios';
import * as types from './actionTypes';

export const getRestoSales = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getRestoSales' });
  try {
    const res = await Axios.get('/resto', { params: { date } });
    const { data } = res;
    dispatch({
      type: types.FETCH_RESTO_SALES,
      api: 'getRestoSales',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getRestoSales',
      status: error.response.status,
      error: 'Getting the user account failed.',
    });
  }
};

export const updateRestoSales = data => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateRestoSales' });
  try {
    const res = await Axios.patch('/resto', data);
    dispatch({
      type: types.UPDATE_RESTO_SALES,
      api: 'updateRestoSales',
      payload: data,
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateRestoSales',
      status: error.response.status,
      error: 'Updating the user account failed.',
    });
  }
};
