import * as types from '../actions/actionTypes';

const initialState = { sales: [] };

const resto = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case types.FETCH_RESTO_SALES:
      return {
        ...state,
        sales: payload,
      };
    case types.UPDATE_RESTO_SALES: {
      const index = state.sales.findIndex(s => s === payload.date);
      if (index) {
        state.sales.map(s => (s !== payload.date ? s : { ...s, ...payload }));
      }
      return {
        ...state,
        sales: {
          ...state.sales,
          payload,
        },
      };
    }
    default:
      return state;
  }
};

export default resto;
