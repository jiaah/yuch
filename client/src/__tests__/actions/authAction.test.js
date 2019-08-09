import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/authAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';
import * as data from '../__mocks__/mockData';

const {
  username,
  password,
  newPassword,
  id,
  token,
  companyName,
  isAdmin,
  email,
} = data;

const store = mockStore({});

describe('async auth request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('calls login action and returns user info object', done => {
    const API_URL = `${API_HOST}/auth/login`;
    const user = { username, password };
    const expectedData = {
      token,
      id,
      companyName,
      isAdmin,
    };

    store.dispatch(actions.userLogin(user));
    moxios.stubRequest(API_URL, {
      status: 200,
      response: expectedData,
    });

    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'login' },
      {
        type: types.USER_LOGIN,
        payload: {
          id,
          companyName,
          isAdmin,
        },
      },
    ];

    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls logout action', () => {
    store.dispatch(actions.userLogout());
    const expectedActions = [{ type: types.USER_LOGOUT }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('calls confirmAdminUser action', done => {
    const API_URL = `${API_HOST}/auth/login/admin`;
    store.dispatch(actions.confirmAdminUser(password));
    moxios.stubRequest(API_URL, { status: 200 });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'confirmAdminUser' },
      { type: types.HTTP_SUCCESS, api: 'confirmAdminUser' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls changePassword action', done => {
    const API_URL = `${API_HOST}/auth/change/password`;
    store.dispatch(actions.changePassword(id, password, newPassword));
    moxios.stubRequest(API_URL, { status: 200 });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'password' },
      { type: types.HTTP_SUCCESS, api: 'password' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls resetPassword action', done => {
    const API_URL = `${API_HOST}/auth/reset/password`;
    store.dispatch(actions.resetPassword(id, newPassword));
    moxios.stubRequest(API_URL, { status: 200 });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'password' },
      { type: types.HTTP_SUCCESS, api: 'password' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls resetPasswordWithAccessToken action', done => {
    const API_URL = `${API_HOST}/auth/reset/password/${token}`;
    store.dispatch(actions.resetPasswordWithAccessToken(token, newPassword));
    moxios.stubRequest(API_URL, { status: 200 });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'password' },
      { type: types.HTTP_SUCCESS, api: 'password' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls keepMeLoggedIn action', () => {
    store.dispatch(actions.keepMeLoggedIn());
    const expectedActions = [{ type: types.KEEP_ME_LOGGED_IN }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('calls findUsername action', done => {
    const API_URL = `${API_HOST}/auth/forgot/username/email`;
    store.dispatch(actions.findUsernameWithEmail(email));
    moxios.stubRequest(API_URL, { status: 200, response: { username } });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'findUsername' },
      {
        type: types.HTTP_SUCCESS,
        api: 'findUsername',
        payload: { username },
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls sendVerificationCodeToEmail action', done => {
    const API_URL = `${API_HOST}/auth/forgot/password`;
    store.dispatch(actions.sendVerificationCodeToEmail(username, email));
    moxios.stubRequest(API_URL, { status: 200 });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'sendVerificationCodeToEmail' },
      { type: types.HTTP_SUCCESS, api: 'sendVerificationCodeToEmail' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
