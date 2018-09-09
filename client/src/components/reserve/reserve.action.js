import * as actionTypes from '../actionTypes';

export const reserve = (date, time, people, place) => ({
  type: actionTypes.RESERVE_INFO,
  payload: {
    date,
    time,
    people,
    place,
  },
});
