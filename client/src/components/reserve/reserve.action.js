import * as actionTypes from '../actionTypes';

export const saveReserveInfo = (id, value) => {
  console.log('ACTION: id, value: ', id, value);
  return {
    type: actionTypes.SAVE_RESERVE_INFO,
    id,
    value,
  };
};
