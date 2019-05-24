import modal from '../../reducers/modalReducer';
import * as types from '../../actions/actionTypes';

const initialState = {
  show: false,
};

test('should setup default reserve values', () => {
  const action = { type: '@@INIT' };
  const state = modal(undefined, action);
  expect(state).toEqual(initialState);
});

test('should set show status on showModal action', () => {
  const state = modal(initialState, {
    type: types.SHOW_MODAL,
  });
  expect(state).toEqual({ ...initialState, show: true });
});

test('should set hide status on hideModal action', () => {
  const state = modal(initialState, {
    type: types.HIDE_MODAL,
  });
  expect(state).toEqual({ ...initialState, show: false });
});
