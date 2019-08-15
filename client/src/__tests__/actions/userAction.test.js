import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/userAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';
import {
  id,
  companyName,
  username,
  email,
  contactNo,
  address,
} from '../__mocks__/mockData';

const userInfo = {
  id,
  companyName,
  username,
  email,
  contactNo,
  address,
};
const store = mockStore({});

describe('async user account actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('receives a user account on success', done => {
    const API_URL = `${API_HOST}/user/me/${id}`;
    store.dispatch(actions.getMe(id));
    moxios.stubRequest(API_URL, {
      status: 200,
      response: userInfo,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getMyAccount' },
      { type: types.HTTP_SUCCESS, api: 'getMyAccount' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('getting a user account fails', done => {
    const API_URL = `${API_HOST}/user/me/${id}`;
    store.dispatch(actions.getMe(id));
    moxios.stubRequest(API_URL, {
      status: 500,
      response: userInfo,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getMyAccount' },
      {
        type: types.HTTP_FAILURE,
        api: 'getMyAccount',
        error: 'Getting the user account failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('edits a user account on success', done => {
    const API_URL = `${API_HOST}/user/edit/${id}`;
    store.dispatch(actions.editUserAccount(id, userInfo));
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editUserAccount' },
      { type: types.HTTP_SUCCESS, api: 'editUserAccount' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('editing a user account fails', done => {
    const API_URL = `${API_HOST}/user/edit/${id}`;
    store.dispatch(actions.editUserAccount(id, userInfo));
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editUserAccount' },
      {
        type: types.HTTP_FAILURE,
        api: 'editUserAccount',
        error: 'Updating the user account failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('updates a user companyName', () => {
    store.dispatch(actions.updateCompanyName(id, companyName));
    const expectedActions = [
      { type: types.USER_LOGIN, payload: { id, companyName, isAdmin: false } },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
