import reserve from './reserveReducer';
import * as types from '../actions/actionTypes';
import * as mockData from '../__tests__/__mocks__/mockData';

const { reserveInitState, reserveUpdatedState } = mockData;

test('should setup default reserve values', () => {
  const action = { type: '@@INIT' };
  const state = reserve(undefined, action);
  expect(state).toEqual(reserveInitState);
});

test('should set loading status on reserve api request', () => {
  const state = reserve(reserveInitState, {
    type: types.RESERVE_REQUEST,
  });
  expect(state).toEqual({ ...reserveInitState, loading: true });
});

test('should set status on reserve api call success', () => {
  const state = reserve(reserveInitState, {
    type: types.RESERVE_SUCCESS,
  });
  expect(state).toEqual({
    ...reserveInitState,
    loading: false,
    apiRequest: 'success',
  });
});

test('should set status on reserve api call fail', () => {
  const state = reserve(reserveInitState, {
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
  const state = reserve(reserveUpdatedState, {
    type: types.RESET_RESERVE,
  });
  expect(state).toEqual(reserveInitState);
});
