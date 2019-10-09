import * as types from '../actions/actionTypes';
import { isActiveUser } from '../utils/date';

const initialState = {
  isLoggedIn: false,
  id: '',
  companyName: '',
  isAdmin: false,
  isActive: false,
  keekMeLoggedIn: false,
};

const auth = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.USER_LOGIN: {
      const isActive = isActiveUser(payload.startDate, '9999-12-31');
      return {
        ...state,
        isLoggedIn: true,
        id: payload.id,
        companyName: payload.companyName,
        isAdmin: payload.isAdmin,
        isActive,
        keekMeLoggedIn: payload.keepMeLoggedIn,
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
