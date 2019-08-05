import * as types from '../actions/actionTypes';

const initialState = {
  api: '',
  isLoading: false,
  data: [],
  error: '',
};

const httpHandler = (state = initialState, action) => {
  // to keep data as [], not undefined when nothing was passed from action.
  const { payload } = action;
  const contents = payload === undefined || payload === null ? [] : payload;
  switch (action.type) {
    case types.HTTP_REQUEST:
      return {
        ...state,
        api: action.api,
        isLoading: true,
        data: [],
        error: '',
      };
    case types.HTTP_SUCCESS:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        data: [...state.data, contents],
        error: '',
      };
    case types.HTTP_FAILURE:
      return {
        ...state,
        api: action.api,
        isLoading: false,
        error: action.error,
      };
    case types.HTTP_RESET:
      return {
        ...state,
        api: '',
        isLoading: false,
        data: [],
        error: '',
      };
    default:
      return state;
  }
};

export default httpHandler;
