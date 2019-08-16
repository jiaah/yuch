import * as types from '../actions/actionTypes';

const initialState = {
  keepUserLoggedIn: false,
};

const keepUserLoggedIn = (state = initialState, action) => {
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

export default keepUserLoggedIn;
