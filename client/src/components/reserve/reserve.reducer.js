import * as types from '../actionTypes';
import { tommrow } from '../../shared/moment';

const initialState = {
  reserve: {
    name: '',
    contact: '(0  )    -    ',
    number: '',
    place: '',
    date: tommrow,
    time: '12:30',
  },
  show: false,
};

const reserve = (state = initialState, action) => {
  const { id, value } = action;

  switch (action.type) {
    case types.SAVE_RESERVE_INFO: {
      return {
        ...state,
        reserve: {
          ...state.reserve,
          [id]: value,
        },
      };
    }
    case types.OPEN_RESERVE: {
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
