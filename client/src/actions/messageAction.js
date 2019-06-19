import * as types from './actionTypes';

export const addFlashMessage = (variant, message) => async dispatch => {
  await dispatch({
    type: types.ADD_FLASH_MESSAGE,
    variant,
    message,
  });

  return window.setTimeout(
    () => dispatch({ type: types.DELETE_FLASH_MESSAGE }),
    3000,
  );
};
