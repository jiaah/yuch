import * as actionTypes from '../actionTypes';
import { tommrow } from '../../shared/moment';

const initialState = {
  reserve: {
    date: tommrow,
    time: '12:30',
  },
  show: false,
};

const reserve = (state = initialState, action) => {
  const { id, value } = action;
  console.log('REDUCER: id, value: ', id, value);

  switch (action.type) {
    case actionTypes.SAVE_RESERVE_INFO: {
      return {
        ...state,
        reserve: {
          ...state.reserve,
          [id]: value,
        },
      };
    }
    case actionTypes.OPEN_RESERVE: {
      return {
        ...state,
        show: !state.show,
      };
    }
    default:
      return state;
  }
};

export default reserve;
