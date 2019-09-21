import * as types from '../actions/actionTypes';

const initialState = {
  catering: [],
  caterings: [],
};

const userCatering = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case types.FETCH_USER_CATERING:
    case types.UPDATE_USER_CATERING:
      return {
        ...state,
        catering: payload,
      };
    case types.FETCH_USERS_CATERING:
      return {
        ...state,
        caterings: payload,
      };
    case types.RESET_USER_CATERING:
      return {
        ...state,
        catering: [],
      };
    default:
      return state;
  }
};

export default userCatering;
