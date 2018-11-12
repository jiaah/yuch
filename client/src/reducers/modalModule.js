const SHOW_MODAL = 'modal/SHOW';
const HIDE_MODAL = 'modal/HIDE';

export const hideModalAction = () => ({
  type: HIDE_MODAL,
});

export const showModalAction = () => ({
  type: SHOW_MODAL,
});

const initialState = {
  show: false,
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { show: true };
    case HIDE_MODAL:
      return { show: false };
    default:
      return state;
  }
};
