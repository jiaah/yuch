import { Axios } from './axios';
import * as types from './actionTypes';

export const resetReserve = () => ({
  type: types.HTTP_RESET,
});

export const reserve = reserveInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'reserve' });
  try {
    const res = await Axios.post('/mail/reserve', reserveInfo);
    dispatch({ type: types.HTTP_SUCCESS, api: 'reserve' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'reserve',
      status: error.response.status,
      error: 'Sending a reservation email failed.',
    });
  }
};

export const bugReport = (error, errorInfo) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'bugReport' });
  try {
    const res = await Axios.post('/mail/bug', { error, errorInfo });
    dispatch({ type: types.HTTP_SUCCESS, api: 'bugReport' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'bugReport',
      status: error.response.status,
      error: "Reporting the bug's failed.",
    });
  }
};
