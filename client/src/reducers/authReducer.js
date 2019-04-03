import * as types from '../actions/actionTypes';

const auth = (state = null, action) => {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
};

export default auth;
