import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  id: '',
  companyName: '',
  isAdmin: false,
  keepUserLoggedIn: false,
  isAdminVerified: false,
};

export const auth = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export const keepUserLoggedIn = (state = initialState, action) => {
  switch (action.type) {
    case types.KEEP_ME_LOGGED_IN:
      return {
        ...state,
        keepUserLoggedIn: !state.keepUserLoggedIn,
      };
    default:
      return state;
  }
};

export const isAdminVerified = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_ADMIN_VERIFIED:
      return {
        isAdminVerified: !state.isAdminVerified,
      };
    default:
      return state;
  }
};
