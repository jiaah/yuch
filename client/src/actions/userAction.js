import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

/* --- Users --- */
// user account
export const getMe = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getMyAccount' });
  try {
    const res = await axios.get(`${API_HOST}/user/me/${id}`);
    const { data } = res;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getMyAccount',
    });
    return data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getMyAccount',
      error: 'Getting the user account failed.',
    });
  }
};

export const editUserAccount = (id, userInfo) => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'editUserAccount' });
  try {
    await axios.patch(`${API_HOST}/user/edit/${id}`, { userInfo });
    return dispatch({
      type: types.HTTP_SUCCESS,
      api: 'editUserAccount',
    });
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'editUserAccount',
      error: 'Updating the user account failed.',
    });
  }
};

export const updateCompanyName = (id, companyName) => ({
  type: types.USER_LOGIN,
  payload: { id, companyName, isAdmin: false },
});
