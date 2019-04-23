import axios from 'axios';
import * as types from './actionTypes';
import * as data from '../shared/data';

export const addFlashMessage = status => async dispatch => {
  const { flashMessages } = data;

  await flashMessages.forEach(i => {
    if (i.status === status) {
      dispatch({
        type: types.ADD_FLASH_MESSAGE,
        status: i.status,
        variant: i.variant,
        message: i.message,
      });
    }
  });

  // return window.setTimeout(
  //   () => dispatch({ type: types.DELETE_FLASH_MESSAGE }),
  //   3000,
  // );
};

export const deleteFlashMessage = () => dispatch => {
  dispatch({ type: types.DELETE_FLASH_MESSAGE });
};
