import * as types from '../actions/actionTypes';

const initialState = {
  show: false,
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
      return {
        ...state,
        show: true,
      };
    case types.HIDE_MODAL:
      return {
        ...state,
        show: false,
      };
    default:
      return state;
  }
};

export default modal;
