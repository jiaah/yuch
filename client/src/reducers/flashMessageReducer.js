import * as types from '../actions/actionTypes';

const initialState = {
  variant: '',
  message: '',
};

const flashMessage = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_FLASH_MESSAGE:
      return {
        ...state,
        variant: action.variant,
        message: action.message,
      };
    case types.DELETE_FLASH_MESSAGE:
      return {
        ...state,
        variant: '',
        message: '',
      };
    default:
      return state;
  }
};

export default flashMessage;
