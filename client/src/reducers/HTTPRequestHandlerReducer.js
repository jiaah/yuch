import * as types from '../actions/actionTypes';

const initialState = {
  api: '',
  isLoading: false,
  data: [],
  error: '',
};

const HTTPRequestHandler = (state = initialState, action) => {
  switch (action.type) {
    case types.HTTP_REQUEST:
      return {
        ...state,
        api: action.api,
        isLoading: true,
      };
    case types.HTTP_SUCCESS:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        data: action.data,
      };
    case types.HTTP_FAILURE:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        error: action.error.response,
      };
    default:
      return state;
  }
};

export default HTTPRequestHandler;
