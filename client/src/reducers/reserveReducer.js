import * as types from '../actions/actionTypes';

const initialState = {
  loading: false,
  apiRequest: null,
  error: '',
};

const reserve = (state = initialState, action) => {
  switch (action.type) {
    case types.RESERVE_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.RESERVE_SUCCESS: {
      return {
        ...state,
        loading: false,
        apiRequest: 'success',
      };
    }
    case types.RESERVE_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
        apiRequest: 'error',
      };
    }
    case types.RESET_RESERVE: {
      return {
        ...state,
        loading: false,
        error: '',
        apiRequest: null,
      };
    }
    default:
      return state;
  }
};

export default reserve;
