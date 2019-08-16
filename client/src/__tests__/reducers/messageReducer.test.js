import message from '../../reducers/messageReducer';
import * as types from '../../actions/actionTypes';

const initialState = {
  show: false,
  variant: '',
  message: '',
};

test('should setup default state', () => {
  const action = { type: '@@INIT' };
  const newState = message(initialState, action);
  expect(newState).toEqual(initialState);
});

test('set a flash message', () => {
  const messageType = 'warning';
  const contents = '로그인을 해주세요.';

  const newState = message(initialState, {
    type: types.ADD_FLASH_MESSAGE,
    variant: messageType,
    message: contents,
  });
  expect(newState).toEqual({
    ...initialState,
    show: true,
    variant: messageType,
    message: contents,
  });
});

test('remove a flash message', () => {
  const newState = message(initialState, {
    type: types.DELETE_FLASH_MESSAGE,
  });
  expect(newState).toEqual({
    ...initialState,
    show: false,
    variant: '',
    message: '',
  });
});
