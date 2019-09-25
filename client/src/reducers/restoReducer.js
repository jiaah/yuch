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
      // console.log(state.sales);
      // const index =
      //   state.sales.length !== 0 &&
      //   state.sales.findIndex(s => s === payload.date);
      // if (index) {
      //   state.sales.map(s => (s === payload.date ? payload : s));
      // }
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
