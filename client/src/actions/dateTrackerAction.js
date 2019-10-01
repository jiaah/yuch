import * as types from './actionTypes';

export const updateDateDaily = date => ({
  type: types.UPDATE_DATE_YYYYMMDD,
  payload: date,
});

export const resetDateDaily = () => ({
  type: types.RESET_DATE_YYYYMMDD,
});

export const updateDateMonthly = date => ({
  type: types.UPDATE_DATE_YYYYMM,
  payload: date,
});

export const resetDateMonthly = () => ({
  type: types.RESET_DATE_YYYYMM,
});

export const updateDateYearly = date => ({
  type: types.UPDATE_DATE_YYYY,
  payload: date,
});

export const resetDateYearly = () => ({
  type: types.RESET_DATE_YYYY,
});
