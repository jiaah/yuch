import * as types from '../actions/actionTypes';

const initialState = {
  value: null,
  data: [],
  users: '활성 계정',
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
        data: action.data,
      };
    case types.RESET_CLICKED_ITEM_DATA:
      return {
        ...state,
        data: [],
      };
    // Select Form
    case types.SAVE_SELECT_VALUE:
      return {
        ...state,
        [action.name]: action.value,
      };
    case types.RESET_SELECT_VALUE: {
      let resetValue;
      if (action.name === 'users') resetValue = '활성 계정';

      return {
        ...state,
        [action.name]: resetValue,
      };
    }
    default:
      return state;
  }
};

export default selectedItem;
