import * as types from '../actions/actionTypes';
import { today, lastMonthYYYYMM, thisYear } from '../helpers/moment';

const initialState = {
  date: today,
  dateMm: `${lastMonthYYYYMM}01`,
  dateYy: `${thisYear}0101`,
};

const dateTracker = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DATE_YYYYMMDD:
      return {
        ...state,
        date: action.payload,
      };
    case types.RESET_DATE_YYYYMMDD:
      return {
        ...state,
        date: today,
      };
    case types.UPDATE_DATE_YYYYMM:
      return {
        ...state,
        dateMm: action.payload,
      };
    case types.RESET_DATE_YYYYMM:
      return {
        ...state,
        dateMm: `${lastMonthYYYYMM}01`,
      };
    case types.UPDATE_DATE_YYYY:
      return {
        ...state,
        dateYy: action.payload,
      };
    case types.RESET_DATE_YYYY:
      return {
        ...state,
        dateYy: `${thisYear}0101`,
      };
    default:
      return state;
  }
};

export default dateTracker;
