import * as types from '../actions/actionTypes';

const initialState = {
  api: '',
  isLoading: false,
  data: [],
  status: null,
  error: '',
};

const httpHandler = (state = initialState, action) => {
  // to keep data as [], not undefined when nothing was passed from action.
  const { payload } = action;
  const contents = payload || [];
  const httpStatus = action.status || null;
  switch (action.type) {
    case types.HTTP_REQUEST:
      return {
        ...state,
        api: action.api,
        isLoading: true,
        data: [],
        status: null,
        error: '',
      };
    case types.HTTP_SUCCESS:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        data: [...state.data, contents],
        status: httpStatus,
        error: '',
      };
    case types.HTTP_FAILURE:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        status: httpStatus,
        error: action.error,
      };
    case types.HTTP_RESET:
      return {
        ...state,
        api: '',
        isLoading: false,
        data: [],
        status: null,
        error: '',
      };
    default:
      return state;
  }
};

export default httpHandler;
