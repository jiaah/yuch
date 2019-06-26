import * as types from './actionTypes';

export const saveSelectedItemValue = value => ({
  type: types.SAVE_SELECTED_ITEM_VALUE,
  value,
});

export const resetSelectedItemValue = value => ({
  type: types.RESET_SELECTED_ITEM_VALUE,
  value,
});

export const saveClickedItemData = data => ({
  type: types.SAVE_CLICKED_ITEM_DATA,
  payload: data,
});

export const resetClickedItemData = () => ({
  type: types.RESET_CLICKED_ITEM_DATA,
});
