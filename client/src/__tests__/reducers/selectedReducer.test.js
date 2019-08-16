import selectedReducer from '../../reducers/selectedReducer';
import * as types from '../../actions/actionTypes';

const initialState = {
  value: null,
  data: [],
};

test('setup default state', () => {
  const action = { type: '@@INIT' };
  const newState = selectedReducer(initialState, action);
  expect(newState).toEqual(initialState);
});

test('save a value', () => {
  const value = 'yuchung';
  const newState = selectedReducer(initialState, {
    type: types.SAVE_SELECTED_ITEM_VALUE,
    value,
  });
  expect(newState).toEqual({ ...initialState, value });
});

test('reset the value state', () => {
  const newState = selectedReducer(initialState, {
    type: types.RESET_SELECTED_ITEM_VALUE,
  });
  expect(newState).toEqual({ ...initialState, value: null });
});
test('save clicked item data', () => {
  const data = {};
  let state;
  const newState = selectedReducer((state = initialState), {
    type: types.SAVE_CLICKED_ITEM_DATA,
    data,
  });
  expect(newState).toEqual({ ...initialState, data: [...state.data, data] });
});

test('reset clicked item data', () => {
  const newState = selectedReducer(initialState, {
    type: types.RESET_CLICKED_ITEM_DATA,
  });
  expect(newState).toEqual({ ...initialState, data: [] });
});
