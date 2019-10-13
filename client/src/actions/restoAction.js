import { Axios } from './axios';
import * as types from './actionTypes';

// restaurant clients 식수
export const fetchUsersResto = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'fetchUserResto' });

  try {
    const res = await Axios.get(`/resto/users`, { params: { date } });
    const { data } = res;
    dispatch({
      type: types.FETCH_USERS_CATERING,
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'fetchUserResto',
      status: error.response.status,
      error: "Fetching user's resto data failed.",
    });
  }
};

export const getRestoSales = date => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getRestoSales' });
  try {
    const res = await Axios.get('/resto', { params: { date } });
    const { data } = res;

    dispatch({
      type: types.FETCH_RESTO_SALES,
      api: 'getRestoSales',
      payload: data,
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getRestoSales',
      status: error.response.status,
      error: 'Getting the user account failed.',
    });
  }
};

export const updateRestoSales = data => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'updateRestoSales' });
  try {
    const res = await Axios.patch('/resto', data);

    dispatch({
      type: types.UPDATE_RESTO_SALES,
      api: 'updateRestoSales',
      payload: data,
    });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'updateRestoSales',
      status: error.response.status,
      error: 'Updating the user account failed.',
    });
  }
};

export const resetRestoSales = () => ({
  type: types.RESET_RESTO_SALES,
});
