import reserveReducer from '../../../features/reserve/reserveReducer';
import * as types from '../../../shared/actionTypes';
import * as mockData from '../../../../__mocks__/mockData';

test('should setup default reserve values', () => {
  const state = reserveReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual(mockData.reserveInitState);
});

test('should setup reserve info', () => {
  const id = 'number';
  const value = 60;
  const state = reserveReducer(undefined, {
    type: types.SAVE_RESERVE_INFO,
    id,
    value,
  });
  expect(state.reserve.number).toBe(60);
});

test('should set reserve show status', () => {
  const state = reserveReducer({ show: false }, { type: types.SHOW_RESERVE });
  expect(state.show).toBe(true);
});

test('should set loading status on reserve api request', () => {
  const state = reserveReducer(
    { loading: false },
    { type: types.RESERVE_REQUEST },
  );
  expect(state.loading).toBe(true);
});

test('should set status on reserve api call success', () => {
  const state = reserveReducer(
    { loading: false, apiRequest: '' },
    { type: types.RESERVE_SUCCESS },
  );
  expect(state).toEqual({ loading: false, apiRequest: 'success' });
});

test('should set status on reserve api call fail', () => {
  const state = reserveReducer(
    { loading: false, apiRequest: '' },
    { type: types.RESERVE_FAILURE },
  );
  expect(state).toEqual({ loading: false, apiRequest: 'error' });
});

test('should reset reserve state', () => {
  const state = reserveReducer(mockData.reserveUpdatedState, {
    type: types.RESET_RESERVE,
  });
  expect(state).toEqual(mockData.reserveInitState);
});
