import * as types from './actionTypes';
import { hideModalAction, showModalAction } from './modalAction';

test('should generate hide modal action', () => {
  const expectedAction = { type: types.HIDE_MODAL };
  expect(hideModalAction()).toEqual(expectedAction);
});

test('should generate show modal action', () => {
  const expectedAction = { type: types.SHOW_MODAL };
  expect(showModalAction()).toEqual(expectedAction);
});
