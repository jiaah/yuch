import * as types from '../actions/actionTypes';
import { today, lastMonthYYYYMM } from '../helpers/moment';

const initialState = {
  date: today,
  dateMm: `${lastMonthYYYYMM}01`,
};

const dateTracker = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DATE:
      return {
        ...state,
        date: action.payload,
      };
    case types.RESET_DATE:
      return {
        ...state,
        date: today,
      };
    case types.UPDATE_DATE_MM:
      return {
        ...state,
        dateMm: action.payload,
      };
    case types.RESET_DATE_MM:
      return {
        ...state,
        dateMm: `${lastMonthYYYYMM}01`,
      };
    default:
      return state;
  }
};

export default dateTracker;
