import * as types from './actionTypes';

export const handleHTTPRequest = () => ({
  type: types.HTTP_REQUEST,
});

export const handleHTTPSuccess = data => ({
  type: types.HTTP_SUCCESS,
  data,
});

export const handleHTTPFailure = error => ({
  type: types.HTTP_FAILURE,
  error,
});
