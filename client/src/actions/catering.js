import { Axios } from './axios';
import * as types from './actionTypes';

export const fetchUserCatering = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'fetchUserCatering' });

  try {
    const res = await Axios.get(`/catering/user/${id}`);
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
      error: "Fetching user's catering failed.",
    });
  }
};
