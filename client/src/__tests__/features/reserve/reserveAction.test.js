import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../../shared/actionTypes';
import * as mockData from '../../__mocks__/mockData';
import {
  showReserve,
  saveReserveInfo,
  reserve,
  resetReserve,
} from '../../../features/reserve/reserveAction';

// config axios && store/ middleware
const mockAxios = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

test('should generate an show reserve action to open the reserve modal', () => {
  expect(showReserve()).toEqual({ type: types.SHOW_RESERVE });
});

test('should setup save reserve info action object', () => {
  const id = 'date';
  const value = '2018-09-30';
  const action = saveReserveInfo(id, value);
  expect(action).toEqual({
    type: types.SAVE_RESERVE_INFO,
    id: 'date',
    value: '2018-09-30',
  });
});

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
