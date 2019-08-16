import modal from '../../reducers/modalReducer';
import * as types from '../../actions/actionTypes';

const initialState = {
  show: false,
};

test('should setup default reserve values', () => {
  const action = { type: '@@INIT' };
  const newState = modal(initialState, action);
  expect(newState).toEqual(initialState);
});

test('should set show status on showModal action', () => {
  const newState = modal(initialState, {
    type: types.SHOW_MODAL,
  });
  expect(newState).toEqual({ ...initialState, show: true });
});

test('should set hide status on hideModal action', () => {
  const newState = modal(initialState, {
    type: types.HIDE_MODAL,
  });
  expect(newState).toEqual({ ...initialState, show: false });
});
