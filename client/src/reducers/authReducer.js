import * as types from '../actions/actionTypes';
import { isActiveUser } from '../utils/date';

const initialState = {
  isLoggedIn: false,
  id: '',
  companyName: '',
  isAdmin: false,
  isActive: false,
  businessType: 'catering',
  keepMeLoggedIn: false,
};

const auth = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.USER_LOGIN: {
      const {
        id,
        companyName,
        isAdmin,
        keepMeLoggedIn,
        startDate,
        endDate,
        businessType,
      } = payload;

      const isActive = isActiveUser(startDate, endDate);

      return {
        ...state,
        isLoggedIn: true,
        id,
        companyName,
        isAdmin,
        isActive,
        businessType,
        keepMeLoggedIn,
      };
    }
    case types.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        id: '',
        companyName: '',
        isAdmin: false,
        isActive: false,
        keepMeLoggedIn: false,
      };
    default:
      return state;
  }
};

export default auth;
