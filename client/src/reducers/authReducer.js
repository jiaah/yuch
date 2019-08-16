import * as types from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  id: '',
  companyName: '',
  isAdmin: false,
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

// should not affect login reducer.
export const keepUserLoggedIn = (
  state = { keepUserLoggedIn: false },
  action,
) => {
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

export const isAdminVerified = (state = { isAdminVerified: false }, action) => {
  switch (action.type) {
    case types.IS_ADMIN_VERIFIED:
      return {
        isAdminVerified: !state.isAdminVerified,
      };
    default:
      return state;
  }
};
