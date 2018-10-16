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
  expect(resetReserve()).toEqual({ type: types.RESET_RESERVE });
});

test('should generate reserve api request action object with provided values', async () => {
  // const action = reserve(reserveInfo);
  // await expect(action).toEqual({
  //   type: types.RESERVE_REQUEST,
  //   reserveInfo,
  // });
  mockAxios.onPost('/api/reserve', mockData.reserveInfo).reply(200);
});
