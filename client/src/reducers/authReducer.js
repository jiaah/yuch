import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userName: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userName: action.payload,
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
      };
    default:
      return state;
  }
};

export default auth;
