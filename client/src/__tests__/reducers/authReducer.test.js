import authReducer from '../../reducers/authReducer';
import * as types from '../../actions/actionTypes';
import { id, companyName, isAdmin } from '../__mocks__/mockData';

const initialState = {
  isLoggedIn: false,
  id: '',
  companyName: '',
  isAdmin: false,
  keepUserLoggedIn: false,
  isAdminVerified: false,
};

test('setup default state', () => {
  const action = { type: '@@INIT' };
  const newState = authReducer(initialState, action);
  expect(newState).toEqual(initialState);
});

test('saves user info on login', () => {
  const newState = authReducer(initialState, {
    type: types.USER_LOGIN,
    payload: { id, companyName, isAdmin },
  });
  expect(newState).toEqual({
    ...initialState,
    isLoggedIn: true,
    id,
    companyName,
    isAdmin,
  });
});

test('reset user info on logout', () => {
  const newState = authReducer(initialState, {
    type: types.USER_LOGOUT,
  });
  expect(newState).toEqual({
    ...initialState,
    isLoggedIn: false,
    id: '',
    companyName: '',
    isAdmin: false,
  });
});
