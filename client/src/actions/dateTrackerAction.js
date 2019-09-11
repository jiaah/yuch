import * as types from './actionTypes';

export const updateDate = date => ({
  type: types.UPDATE_DATE,
  payload: date,
});

export const resetDate = () => ({
  type: types.RESET_DATE,
});
