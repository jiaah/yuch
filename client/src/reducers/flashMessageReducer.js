import * as types from '../actions/actionTypes';

const initialState = {
  status: '',
  variant: '',
  message: '',
};

const flashMessage = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_FLASH_MESSAGE:
      return {
        ...state,
        status: action.status,
        variant: action.variant,
        message: action.message,
      };
    case types.DELETE_FLASH_MESSAGE:
      return {
        ...state,
        status: '',
        variant: '',
        message: '',
      };
    default:
      return state;
  }
};

export default flashMessage;
