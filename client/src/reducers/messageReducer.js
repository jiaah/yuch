import * as types from '../actions/actionTypes';

const initialState = {
  show: false,
  variant: '',
  message: '',
};

const message = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_FLASH_MESSAGE:
      return {
        ...state,
        show: true,
        variant: action.variant,
        message: action.message,
      };
    case types.DELETE_FLASH_MESSAGE:
      return {
        ...state,
        show: false,
        variant: '',
        message: '',
      };
    default:
      return state;
  }
};

export default message;
