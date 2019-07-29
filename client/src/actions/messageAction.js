import * as types from './actionTypes';

export const addFlashMessage = (variant, message) => async dispatch => {
  await dispatch({
    type: types.ADD_FLASH_MESSAGE,
    variant,
    message,
  });
};

export const removeFlashMessage = () => ({
  type: types.DELETE_FLASH_MESSAGE,
});
