import * as types from '../actions/actionTypes';

const initialState = {
  value: null,
};

const selectedItem = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_SELECTED_ITEM:
      return {
        ...state,
        value: action.value,
      };
    case types.DELETE_SELECTED_ITEM:
      return {
        ...state,
        value: null,
      };
    default:
      return state;
  }
};

export default selectedItem;
