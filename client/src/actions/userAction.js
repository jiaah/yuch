import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const getUsers = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getUsers' });
  try {
    const res = await axios.get(`${API_HOST}/user/users`);
    const users = res.data;
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getUsers',
      payload: { users },
    });
    return users;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'getUsers', error });
    throw new Error('Getting users list is failed');
  }
};
