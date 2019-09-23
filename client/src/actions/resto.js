import { Axios } from './axios';
import * as types from './actionTypes';

export const getRestoSales = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getRestoSales' });
  try {
    const res = await Axios.get(`/user/me/${id}`);
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getRestoSales',
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

export const updateRestoSales = (id, userInfo) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateRestoSales' });
  try {
    await Axios.patch(`/user/edit/${id}`, { userInfo });
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'updateRestoSales',
    });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateRestoSales',
      status: error.response.status,
      error: 'Updating the user account failed.',
    });
  }
};
