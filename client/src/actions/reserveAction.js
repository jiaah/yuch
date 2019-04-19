import axios from 'axios';
import * as types from './actionTypes';
import { API_HOST } from '../../config';

export const resetReserve = () => ({
  type: types.HTTP_RESET,
});

export const reserve = reserveInfo => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'reserve' });
  try {
    const res = await axios.post(`${API_HOST}/reserve`, reserveInfo);
    dispatch({ type: types.HTTP_SUCCESS, api: 'reserve' });
    return res;
  } catch (error) {
    dispatch({ type: types.HTTP_FAILURE, api: 'reserve', error });
  }
};
