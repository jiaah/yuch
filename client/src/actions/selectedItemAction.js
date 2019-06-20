import * as types from './actionTypes';

export const addSelectedItem = value => ({
  type: types.ADD_SELECTED_ITEM,
  value,
});

export const deleteSelectedItem = value => ({
  type: types.DELETE_SELECTED_ITEM,
  value,
});
