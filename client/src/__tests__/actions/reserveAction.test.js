import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/reserveAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';

const store = mockStore({});

describe('async reserve request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should generate reset reserve info action', () => {
    store.dispatch(actions.resetReserve());
    const expectedActions = [{ type: types.HTTP_RESET }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('creates RESERVE_SUCCESS after successfully sending reserve request', async done => {
    const API_URL = `${API_HOST}/reserve`;
    await store.dispatch(actions.reserve());

    moxios.stubRequest(API_URL, {
      status: 201,
    });

    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'reserve' },
      { type: types.HTTP_SUCCESS, api: 'reserve' },
    ];

    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it('creates HTTP_FAILURE when sending reserve request failed', async done => {
    const API_URL = `${API_HOST}/reserve`;
    const error = 'server error';
    await store.dispatch(actions.reserve());

    moxios.stubRequest(API_URL, {
      status: 400,
    });

    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'reserve' },
      { type: types.HTTP_FAILURE, api: 'reserve', error },
    ];

    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
