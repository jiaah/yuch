import { Axios } from './axios';
import * as types from './actionTypes';

export const fetchUserCatering = (id, date) => async dispatch => {
  console.log('id, date: ', id, date);
  dispatch({ type: types.HTTP_REQUEST, api: 'fetchUserCatering' });

  try {
    const res = await Axios.get(`/catering/user/${id}`, { date });
    const { data } = res;
    dispatch({
      type: types.FETCH_USER_CATERING_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'fetchUserCatering',
      status: error.response.status,
      error: "Fetching user's catering failed.",
    });
  }
};
