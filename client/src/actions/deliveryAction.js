import { Axios } from './axios';
import * as types from './actionTypes';

export const getRoutes = () => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'getRoutes' });
  try {
    const res = await Axios.get('/delivery/routes');
    dispatch({
      type: types.HTTP_SUCCESS,
      api: 'getRoutes',
    });
    return res.data;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'getRoutes',
      status: error.response.status,
      error: 'Getting routes failed.',
    });
  }
};

export const createRoute = values => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'createRoute' });
  try {
    const res = await Axios.post('/delivery/route', values);
    dispatch({ type: types.HTTP_SUCCESS, api: 'createRoute' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'createRoute',
      status: error.response.status,
      error: 'Creating route failed.',
    });
  }
};

export const deleteRoute = id => async dispatch => {
  dispatch({ type: types.HTTP_REQUEST, api: 'deleteRoute' });
  try {
    const res = await Axios.delete(`/admin/bankaccount/${id}`);
    dispatch({ type: types.HTTP_SUCCESS, api: 'deleteRoute' });
    return res;
  } catch (error) {
    return dispatch({
      type: types.HTTP_FAILURE,
      api: 'deleteRoute',
      status: error.response.status,
      error: 'Deleting route failed.',
    });
  }
};
