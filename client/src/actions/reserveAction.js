import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const showReserve = () => ({
  type: types.SHOW_RESERVE,
});

export const resetReserve = () => ({
  type: types.RESET_RESERVE,
});

export const reserve = reserveInfo => async dispatch => {
  dispatch({
    type: types.RESERVE_REQUEST,
  });
  try {
    const response = await axios.post(`${API_HOST}/reserve`, reserveInfo);
    dispatch({
      type: types.RESERVE_SUCCESS,
      response,
    });
  } catch (error) {
    dispatch({
      type: types.RESERVE_FAILURE,
      error,
    });
  }
  return 'done';
};
