import * as types from '../actions/actionTypes';

const initialState = { sales: [] };

const resto = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RESTO_SALES:
      return {
        ...state,
        sales: payload,
      };
    case types.UPDATE_RESTO_SALES: {
      const index =
        state.sales.length !== 0 &&
        state.sales.findIndex(s => s.date === payload.date);

      if (index !== -1) {
        const newObj = state.sales.map(
          s => (s.date === payload.date ? payload : s),
        );
        return {
          ...state,
          sales: newObj,
        };
      }
      return {
        ...state,
        sales: [...state.sales, ...payload],
      };
    }
    case types.RESET_RESTO_SALES:
      return {
        ...state,
        sales: [],
      };
    default:
      return state;
  }
};

export default resto;
