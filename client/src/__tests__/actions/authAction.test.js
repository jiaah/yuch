import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/authAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';

const store = mockStore({});

describe('async auth request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('calls login axios and returns user info object', async done => {
    const API_URL = `${API_HOST}/auth/login`;
    const userInfo = {
      token: '8f5af680-973e-11e4-ad43-4ee58e9a13a6',
      id: '8f5af680-973e-11e4-ad43-a13a6',
      companyName: 'yuchung',
      isAdmin: 'true',
    };

    store.dispatch(actions.userLogin('yuchung', 'testPw1234'));
    moxios.stubRequest(API_URL, {
      status: 200,
      response: { data: { userInfo } },
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'login' },
      {
        type: types.USER_LOGIN,
        payload: {
          id: '8f5af680-973e-11e4-ad43-a13a6',
          companyName: 'yuchung',
          isAdmin: 'true',
        },
      },
    ];

    moxios.wait(async () => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('calls logout axios', () => {
    store.dispatch(actions.userLogout());
    const expectedActions = [{ type: types.USER_LOGOUT }];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
