import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
// import mockAxios from 'axios';
import * as types from '../../../shared/actionTypes';
import * as mockData from '../../__mocks__/mockData';
import { reserve, resetReserve } from '../../../features/reserve/reserveAction';

// config store/ middleware & axios
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mockAxios = new MockAdapter(axios);

test('should generate reset reserve info action', () => {
  const expectedAction = { type: types.RESET_RESERVE };
  expect(resetReserve()).toEqual(expectedAction);
});

describe('async reserve request actions', async () => {
  // mockAxios.onPost('/api/reserve', mockRequest).reply(200);
  // const expectedActions = [
  //   {
  //     type: types.RESERVE_REQUEST,
  //     body: { reserveInfo: mockData.reserveUpdatedState },
  //   },
  //   { type: types.RESERVE_SUCCESS },
  // ];
  // const store = mockStore({});
  // store.dispatch(reserve()).then(() => {
  //   expect(store.getActions()).toEqual(expectedActions);
  // });
});
