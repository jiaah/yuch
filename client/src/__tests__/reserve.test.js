import * as types from '../shared/actionTypes';
import { saveReserveInfo } from '../features/reserve/reserve.action';

test('should create an action to update reserve info', () => {
  const id = 'date';
  const value = '2018-09-30';
  const action = saveReserveInfo(id, value);
  expect(action).toEqual({
    type: types.SAVE_RESERVE_INFO,
    id: 'date',
    value: '2018-09-30',
  });
});
