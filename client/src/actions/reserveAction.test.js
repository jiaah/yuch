import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from './actionTypes';
import * as mockData from '../__tests__/__mocks__/mockData';
import * as actions from './reserveAction';

// config store/ middleware & axios
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

test('should generate reset reserve info action', () => {
  const expectedAction = { type: types.RESET_RESERVE };
  expect(actions.resetReserve()).toEqual(expectedAction);
});

describe('async reserve request actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('creates RESERVE_SUCCESS after successfully sending reserve request', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      expect(request.config.method).toEqual('post');

      request.respondWith({
        status: 200,
      });
    });

    const expectedActions = [
      { type: types.RESERVE_REQUEST },
      { type: types.RESERVE_SUCCESS },
    ];

    await store.dispatch(actions.reserve()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
