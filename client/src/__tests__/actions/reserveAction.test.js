import moxios from 'moxios';
import { Axios } from '../../actions/axios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/reserveAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';
import { reserveContents } from '../__mocks__/mockData';

const store = mockStore({});

describe('async reserve request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install(Axios);
  });

  afterEach(() => {
    moxios.uninstall(Axios);
  });

  it('should generate reset reserve info action', () => {
    store.dispatch(actions.resetReserve());
    const expectedActions = [{ type: types.HTTP_RESET }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('calls RESERVE_SUCCESS action type after successfully sending reserve request', done => {
    const API_URL = `${API_HOST}/reserve`;
    store.dispatch(actions.reserve(reserveContents));

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

  it('calls HTTP_FAILURE action type when sending reserve request failed', done => {
    const API_URL = `${API_HOST}/reserve`;
    const error = 'Sending a reservation email failed.';
    store.dispatch(actions.reserve());

    moxios.stubRequest(API_URL, {
      status: 500,
    });

    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'reserve' },
      { type: types.HTTP_FAILURE, api: 'reserve', status: 500, error },
    ];

    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
