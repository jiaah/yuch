import axios from 'axios';
import * as types from '../actionTypes';

export const saveReserveInfo = (id, value) => ({
  type: types.SAVE_RESERVE_INFO,
  id,
  value,
});

export const showReserve = () => ({
  type: types.SHOW_RESERVE,
});

export const reserve = reserveInfo => dispatch => {
  dispatch({
    type: types.RESERVE_REQUEST,
  });
  axios
    .post('/reserve', reserveInfo)
    .then(() =>
      dispatch({
        type: types.RESERVE_SUCCESS,
      }),
    )
    .catch(error =>
      dispatch({
        type: types.RESERVE_FAILURE,
        error,
      }),
    );
};

export const resetReserve = () => ({
  type: types.RESET_RESERVE,
});
