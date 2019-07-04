import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  companyName: '',
  username: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        companyName: action.payload.companyName,
        username: action.payload.username,
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        companyName: '',
        username: '',
      };
    default:
      return state;
  }
};

export default auth;
