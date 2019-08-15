import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/adminAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';
import {
  id,
  companyName,
  username,
  contactNo,
  email,
} from '../__mocks__/mockData';

const userInfo = {
  id,
  companyName,
  username,
  contactNo,
  email,
};
const store = mockStore({});

describe('async admin actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('receives admin account info on success', done => {
    const API_URL = `${API_HOST}/admin/me/${id}`;
    const expectedData = {
      id,
      companyName,
      username,
      contactNo,
      email,
    };
    store.dispatch(actions.getAdmin(id));
    moxios.stubRequest(API_URL, {
      status: 200,
      response: expectedData,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getAdmin' },
      { type: types.HTTP_SUCCESS, api: 'getAdmin' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls HTTP_FAILURE action type when getAdmin failed', done => {
    const API_URL = `${API_HOST}/admin/me/${id}`;
    store.dispatch(actions.getAdmin(id));
    moxios.stubRequest(API_URL, {
      status: 409,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getAdmin' },
      {
        type: types.HTTP_FAILURE,
        api: 'getAdmin',
        error: 'Getting the admin account failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('edits admin account', done => {
    const API_URL = `${API_HOST}/admin/edit/${id}`;
    const values = {
      id,
      companyName,
      username,
      contactNo,
      email,
    };
    store.dispatch(actions.editAdminAccount(id, values));
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editAdminAccount' },
      { type: types.HTTP_SUCCESS, api: 'editAdminAccount' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('editing admin account fail', done => {
    const API_URL = `${API_HOST}/admin/edit/${id}`;
    const values = {
      id,
      companyName,
      username,
      contactNo,
      email,
    };
    store.dispatch(actions.editAdminAccount(id, values));
    moxios.stubRequest(API_URL, {
      status: 409,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editAdminAccount' },
      {
        type: types.HTTP_FAILURE,
        api: 'editAdminAccount',
        error: 'Updating the admin account failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('receives users account info on success', done => {
    const API_URL = `${API_HOST}/admin/users`;
    const expectedData = {
      id,
      companyName,
      username,
      contactNo,
      email,
    };
    store.dispatch(actions.getUsers());
    moxios.stubRequest(API_URL, {
      status: 200,
      response: expectedData,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getUsers' },
      { type: types.HTTP_SUCCESS, api: 'getUsers' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('getting Users fails', done => {
    const API_URL = `${API_HOST}/admin/users`;
    store.dispatch(actions.getUsers());
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getUsers' },
      {
        type: types.HTTP_FAILURE,
        api: 'getUsers',
        error: 'Getting users list is failed',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('creates a user account on success', done => {
    const API_URL = `${API_HOST}/admin/user/register`;
    store.dispatch(actions.createUser(userInfo));
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'createUser' },
      { type: types.HTTP_SUCCESS, api: 'createUser' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('creating a user account fails', done => {
    const API_URL = `${API_HOST}/admin/user/register`;
    store.dispatch(actions.createUser(userInfo));
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'createUser' },
      {
        type: types.HTTP_FAILURE,
        api: 'createUser',
        error: 'Creating a user failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('edits a user account on success', done => {
    const API_URL = `${API_HOST}/admin/user/edit/${id}`;
    store.dispatch(actions.editUser(userInfo));
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editUser' },
      { type: types.HTTP_SUCCESS, api: 'editUser' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('editing a user account fails', done => {
    const API_URL = `${API_HOST}/admin/user/edit/${id}`;
    store.dispatch(actions.editUser(userInfo));
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editUser' },
      {
        type: types.HTTP_FAILURE,
        api: 'editUser',
        error: 'Editing a user failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('deletes a user account on success', done => {
    const API_URL = `${API_HOST}/admin/user/delete/${id}`;
    store.dispatch(actions.deleteUser(id));
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'deleteUser' },
      { type: types.HTTP_SUCCESS, api: 'deleteUser' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('deleting a user account fails', done => {
    const API_URL = `${API_HOST}/admin/user/delete/${id}`;
    store.dispatch(actions.deleteUser(id));
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'deleteUser' },
      {
        type: types.HTTP_FAILURE,
        api: 'deleteUser',
        error: 'Deleting the user failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
