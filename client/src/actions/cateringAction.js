import { Axios } from './axios';
import * as types from './actionTypes';

export const fetchUserCatering = (id, date) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'fetchUserCatering' });

  try {
    const res = await Axios.get(`/catering/user/${id}`, { params: { date } });
    const { data } = res;
    console.log('data in GET action: ', data);
    dispatch({
      type: types.FETCH_USER_CATERING,
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'fetchUserCatering',
      status: error.response.status,
      error: "Fetching user's catering data failed.",
    });
  }
};

export const updateUserCatering = (id, data) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateUserCatering' });

  try {
    const res = await Axios.patch(`/catering/user/${id}`, data);

    dispatch({
      type: types.UPDATE_USER_CATERING,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateUserCatering',
      status: error.response.status,
      error: "Updating user's catering data failed.",
    });
  }
};
