import { Axios } from './axios';
import * as types from './actionTypes';

export const resetReserve = () => ({
  type: types.HTTP_RESET,
});

export const reserve = reserveInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'reserve' });

  let resFeedback = null;
  let res;

  try {
    res = await Axios.post('/mail/reserve', reserveInfo);
    resFeedback = { type: types.HTTP_SUCCESS, api: 'reserve' };
    console.log('res in action: ', res);
  } catch (error) {
    console.log('error in action: ', error);
    resFeedback = {
      type: types.HTTP_FAILURE,
      api: 'reserve',
      status: error.response ? error.response.status : 400,
      error: 'Sending a reservation email failed.',
    };
  }

  if (resFeedback.error) {
    return dispatch(resFeedback);
  }
  dispatch(resFeedback);
  return res;
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
