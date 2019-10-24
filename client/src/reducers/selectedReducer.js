import * as types from '../actions/actionTypes';
import { lastMonth } from '../helpers/moment';

const initialState = {
  value: null,
  secondValue: null,
  data: [],
  users: '활성 계정',
  updateInvoice: lastMonth,
  employees: '전체',
  guide: '식수 변경',
  position: '직원',
};

const selectedItem = (state = initialState, action) => {
  const { data } = action;
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
    // for special_meal second search bar on create modal
    case types.SAVE_SECOND_ITEM_VALUE:
      return {
        ...state,
        secondValue: action.value,
      };
    case types.RESET_SECOND_ITEM_VALUE:
      return {
        ...state,
        secondValue: null,
      };
    case types.SAVE_CLICKED_ITEM_DATA:
      return {
        ...state,
        data: [...state.data, ...data],
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
      if (action.name === 'updateInvoice') resetValue = lastMonth;
      if (action.name === 'employees') resetValue = '전체';
      if (action.name === 'guide') resetValue = '식수 변경';
      if (action.name === 'position') resetValue = '직원';

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
