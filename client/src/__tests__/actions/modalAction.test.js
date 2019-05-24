import * as types from '../../actions/actionTypes';
import { hideModal, showModal } from '../../actions/modalAction';

test('should generate hide modal action', () => {
  const expectedAction = { type: types.HIDE_MODAL };
  expect(hideModal()).toEqual(expectedAction);
});

test('should generate show modal action', () => {
  const expectedAction = { type: types.SHOW_MODAL };
  expect(showModal()).toEqual(expectedAction);
});
