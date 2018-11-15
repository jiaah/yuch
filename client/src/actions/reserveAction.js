import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const showReserve = () => ({
  type: types.SHOW_RESERVE,
});

export const resetReserve = () => ({
  type: types.RESET_RESERVE,
});

export const reserve = reserveInfo => dispatch => {
  dispatch({
    type: types.RESERVE_REQUEST,
  });
  return axios
    .post(`${API_HOST}/api/reserve`, reserveInfo)
    .then(() =>
      dispatch({
        type: types.RESERVE_SUCCESS,
        reserveInfo,
      }),
    )
    .catch(error =>
      dispatch({
        type: types.RESERVE_FAILURE,
        error,
      }),
    );
};
