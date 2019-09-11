import * as types from '../actions/actionTypes';
import { today } from '../helpers/moment';

const initialState = {
  date: today,
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
    default:
      return state;
  }
};

export default dateTracker;
