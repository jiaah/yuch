import * as types from '../actions/actionTypes';

const initialState = { data: [] };

const partner = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.FETCH_DATA:
      return {
        ...state,
        data: payload,
      };
    case types.UPDATE_DATA: {
      const index =
        state.data.length !== 0 &&
        state.data.findIndex(s => s.companyName === payload.companyName);

      if (index !== -1) {
        const newObj = state.data.map(
          s => (s.companyName === payload.companyName ? payload : s),
        );
        return {
          ...state,
          data: newObj,
        };
      }
      return {
        ...state,
        data: [...state.data, ...payload],
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

export default partner;