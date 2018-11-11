import axios from 'axios';
import * as types from '../../shared/actionTypes';

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
    .post('/api/reserve', reserveInfo)
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
