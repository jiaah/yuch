import * as types from '../actions/actionTypes';

const initialState = { data: [] };

const data = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.FETCH_DATA:
      return {
        ...state,
        data: payload,
      };
    case types.CREATE_DATA: {
      return {
        ...state,
        data: [...state.data, ...payload],
      };
    }
    case types.UPDATE_DATA: {
      const newObj = state.data.map(s => (s.id === payload.id ? payload : s));
      return {
        ...state,
        data: newObj,
      };
    }
    case types.DELETE_DATA: {
      return {
        ...state,
        data: state.data.filter(s => s.id !== payload.id),
      };
    }
    case types.RESET_DATA:
      return {
        ...state,
        data: [],
      };
    default:
      return state;
  }
};

export default data;
