import HTTPHandlerReducer from '../../reducers/HTTPHandlerReducer';
import * as types from '../../actions/actionTypes';

const initialState = {
  api: '',
  isLoading: false,
  data: [],
  error: '',
};

const api = 'login';

test('setup default state', () => {
  const action = { type: '@@INIT' };
  const newState = HTTPHandlerReducer(initialState, action);
  expect(newState).toEqual(initialState);
});

test('http request', () => {
  const newState = HTTPHandlerReducer(initialState, {
    type: types.HTTP_REQUEST,
    api,
  });
  expect(newState).toEqual({
    ...initialState,
    api,
    isLoading: true,
  });
});

test('data value should be [] when payload is undefined on http success', () => {
  let state;
  const payload = undefined;
  const newState = HTTPHandlerReducer((state = initialState), {
    type: types.HTTP_SUCCESS,
    api,
    payload,
  });

  expect(newState).toEqual({
    ...initialState,
    api,
    isLoading: false,
    data: [...state.data, []],
  });
});

test('data value should be [] when payload is null on http success', () => {
  let state;
  const payload = null;
  const newState = HTTPHandlerReducer((state = initialState), {
    type: types.HTTP_SUCCESS,
    api,
    payload,
  });

  expect(newState).toEqual({
    ...initialState,
    api,
    isLoading: false,
    data: [...state.data, []],
  });
});

test('data value should not be [] when payload is not null nor undefined on http success', () => {
  let state;
  const payload = { username: 'yuchung' };
  const newState = HTTPHandlerReducer((state = initialState), {
    type: types.HTTP_SUCCESS,
    api,
    payload,
  });

  expect(newState).toEqual({
    ...initialState,
    api,
    isLoading: false,
    data: [...state.data, payload],
  });
});

test('http failure', () => {
  const error = 'login failed';
  const newState = HTTPHandlerReducer(initialState, {
    type: types.HTTP_FAILURE,
    api,
    error,
  });
  expect(newState).toEqual({
    ...initialState,
    api,
    error,
    isLoading: false,
  });
});

test('http reset', () => {
  const newState = HTTPHandlerReducer(initialState, {
    type: types.HTTP_RESET,
  });
  expect(newState).toEqual({
    ...initialState,
    api: '',
    isLoading: false,
    data: [],
    error: '',
  });
});
