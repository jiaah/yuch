import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  id: '',
  companyName: '',
  isAdmin: false,
  keepLoggedIn: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        id: action.payload.id,
        companyName: action.payload.companyName,
        isAdmin: action.payload.isAdmin,
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        id: '',
        companyName: '',
        isAdmin: false,
      };
    case types.KEEP_ME_LOGGED_IN:
      return {
        ...state,
        keepLoggedIn: !state.keepLoggedIn,
      };
    default:
      return state;
  }
};

export default auth;
