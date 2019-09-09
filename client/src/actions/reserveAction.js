import { Axios } from './axios';
import * as types from './actionTypes';

export const resetReserve = () => ({
  type: types.HTTP_RESET,
});

export const reserve = reserveInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'reserve' });
  try {
    await Axios.post('/reserve', reserveInfo);
    return dispatch({ type: types.HTTP_SUCCESS, api: 'reserve' });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'reserve',
      status: error.response.status,
      error: 'Sending a reservation email failed.',
    });
  }
};
