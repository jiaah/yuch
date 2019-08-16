import * as types from '../actions/actionTypes';

const initialState = { isAdminVerified: false };

const isAdminVerified = (state = initialState, action) => {
  switch (action.type) {
    case types.IS_ADMIN_VERIFIED:
      return {
        isAdminVerified: !state.isAdminVerified,
      };
    default:
      return state;
  }
};

export default isAdminVerified;
