import * as types from '../actions/actionTypes';

const initialState = {
  api: '',
  isLoading: false,
  data: [],
  status: '',
  error: '',
};

const httpHandler = (state = initialState, action) => {
  // to keep data as [], not undefined when nothing was passed from action.
  const { payload, status } = action;
  const contents = payload || [];
  const httpStatus = status || '';
  switch (action.type) {
    case types.HTTP_REQUEST:
      return {
        ...state,
        api: action.api,
        isLoading: true,
        data: [],
        error: '',
        status: '',
      };
    case types.HTTP_SUCCESS:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        data: [...state.data, contents],
        error: '',
        status: httpStatus,
      };
    case types.HTTP_FAILURE:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        error: action.error,
        status: httpStatus,
      };
    case types.HTTP_RESET:
      return {
        ...state,
        api: '',
        isLoading: false,
        data: [],
        error: '',
        status: '',
      };
    default:
      return state;
  }
};

export default httpHandler;
