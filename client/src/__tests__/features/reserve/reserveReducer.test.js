import reserveReducer from '../../../features/reserve/reserveReducer';
import * as types from '../../../shared/actionTypes';
import * as mockData from '../../__mocks__/mockData';

const { reserveInitState, reserveUpdatedState } = mockData;

test('should setup default reserve values', () => {
  const action = { type: '@@INIT' };
  const state = reserveReducer(undefined, action);
  expect(state).toEqual(mockData.reserveInitState);
});

test('should update reserve info obj', () => {
  const id = 'number';
  const value = 60;
  const state = reserveReducer(reserveInitState, {
    type: types.SAVE_RESERVE_INFO,
    id,
    value,
  });
  expect(state.reserve.number).toBe(60);
});

test('should set reserve show status', () => {
  const state = reserveReducer(reserveInitState, {
    type: types.SHOW_RESERVE,
  });
  expect(state).toEqual({ ...reserveInitState, show: true });
});

test('should set loading status on reserve api request', () => {
  const state = reserveReducer(reserveInitState, {
    type: types.RESERVE_REQUEST,
  });
  expect(state).toEqual({ ...reserveInitState, loading: true });
});

test('should set status on reserve api call success', () => {
  const state = reserveReducer(reserveInitState, {
    type: types.RESERVE_SUCCESS,
  });
  expect(state).toEqual({
    ...reserveInitState,
    loading: false,
    apiRequest: 'success',
  });
});

test('should set status on reserve api call fail', () => {
  const state = reserveReducer(reserveInitState, {
    type: types.RESERVE_FAILURE,
  });
  expect(state).toEqual({
    ...reserveInitState,
    loading: false,
    apiRequest: 'error',
    error: undefined,
  });
});

test('should reset reserve state', () => {
  const state = reserveReducer(reserveUpdatedState, {
    type: types.RESET_RESERVE,
  });
  expect(state).toEqual(reserveInitState);
});
