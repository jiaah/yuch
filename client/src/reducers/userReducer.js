import * as types from '../actions/actionTypes';

const initialState = {
  userData: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_CLICKED_USER_DATA:
      return {
        ...state,
        userData: [...state.userData, action.payload],
      };
    case types.RESET_CLICKED_USER_DATA:
      return {
        ...state,
        userData: [],
      };
    default:
      return state;
  }
};

export default user;
