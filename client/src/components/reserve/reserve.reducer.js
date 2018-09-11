import update from 'immutability-helper';
import * as actionTypes from '../actionTypes';
import { tommrow } from '../../shared/moment';

const initialState = {
  reserve: {
    date: tommrow,
    time: '12:30',
  },
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
    default:
      return state;
  }
};

export default reserve;
