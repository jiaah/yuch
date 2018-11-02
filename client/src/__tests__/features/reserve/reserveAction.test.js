import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../../shared/actionTypes';
import * as mockData from '../../__mocks__/mockData';
import { reserve, resetReserve } from '../../../features/reserve/reserveAction';

// config axios && store/ middleware
const mockAxios = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

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
