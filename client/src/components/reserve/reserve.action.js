import * as types from '../actionTypes';

export const saveReserveInfo = (id, value) => {
  console.log('ACTION: id, value: ', id, value);
  return {
    type: types.SAVE_RESERVE_INFO,
    id,
    value,
  };
};

export const openReserve = () => ({
  type: types.OPEN_RESERVE,
});
