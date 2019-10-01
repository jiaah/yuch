import * as types from './actionTypes';

export const updateDate = date => ({
  type: types.UPDATE_DATE,
  payload: date,
});

export const resetDate = () => ({
  type: types.RESET_DATE,
});

export const updateDateMm = date => ({
  type: types.UPDATE_DATE_MM,
  payload: date,
});

export const resetDateMm = () => ({
  type: types.RESET_DATE_MM,
});
