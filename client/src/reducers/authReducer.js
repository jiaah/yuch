import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  companyName: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        companyName: action.payload,
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        companyName: '',
      };
    default:
      return state;
  }
};

export default auth;
