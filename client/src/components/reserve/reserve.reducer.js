import update from 'immutability-helper';
import * as actionTypes from '../actionTypes';
import { tommrow } from '../../shared/moment';

const initialState = {
  reserve: {
    when: tommrow,
    at: '12:30',
    number: '',
    place: '',
  },
};

const reserve = (state = initialState, action) => {
  const { date, time, people, place } = action;
  const reserveInfo = { when: date, at: time, number: people, where: place };

  switch (action.Type) {
    case actionTypes.RESERVE_INFO: {
      // Fix this.
      return update(state, {
        reserve: { $set: reserveInfo },
      });
    }
    default:
      return state;
  }
};

export default reserve;
