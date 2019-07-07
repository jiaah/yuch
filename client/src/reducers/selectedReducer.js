import * as types from '../actions/actionTypes';

const initialState = {
  value: null,
  data: [],
};

const selectedItem = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_SELECTED_ITEM_VALUE:
      return {
        ...state,
        value: action.value,
      };
    case types.RESET_SELECTED_ITEM_VALUE:
      return {
        ...state,
        value: null,
      };
    case types.SAVE_CLICKED_ITEM_DATA:
      return {
        ...state,
        data: [...state.data, action.data],
      };
    case types.RESET_CLICKED_ITEM_DATA:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default selectedItem;
