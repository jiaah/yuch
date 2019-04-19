import * as types from './actionTypes';
import { hideModal, showModal } from './modalAction';

test('should generate hide modal action', () => {
  const expectedAction = { type: types.HIDE_MODAL };
  expect(hideModal()).toEqual(expectedAction);
});

test('should generate show modal action', () => {
  const expectedAction = { type: types.SHOW_MODAL };
  expect(showModal()).toEqual(expectedAction);
});
