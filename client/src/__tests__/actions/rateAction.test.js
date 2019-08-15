import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/rateAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';
import { id, companyName, mealPrice, date } from '../__mocks__/mockData';

const rates = { id, companyName, mealPrice };
const store = mockStore({});

describe('async catering rates actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('receives meal prices of all clients on success', done => {
    const API_URL = `${API_HOST}/admin/users/catering/rates`;
    store.dispatch(actions.getCateringRates());
    moxios.stubRequest(API_URL, {
      status: 200,
      response: rates,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getCateringRates' },
      { type: types.HTTP_SUCCESS, api: 'getCateringRates', payload: { rates } },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('getting meal prices of all clients fails', done => {
    const API_URL = `${API_HOST}/admin/users/catering/rates`;
    store.dispatch(actions.getCateringRates());
    moxios.stubRequest(API_URL, {
      status: 500,
      response: rates,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getCateringRates' },
      {
        type: types.HTTP_FAILURE,
        api: 'getCateringRates',
        error: 'Getting users list is failed',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('edits a meal price on success', done => {
    const API_URL = `${API_HOST}/admin/users/catering/rates`;
    store.dispatch(actions.updateReservedPrice(id, mealPrice, date));
    moxios.stubRequest(API_URL, {
      status: 200,
      response: { id, mealPrice, date },
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'updateReservedPrice' },
      {
        type: types.HTTP_SUCCESS,
        api: 'updateReservedPrice',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('editing a meal price fails', done => {
    const API_URL = `${API_HOST}/admin/users/catering/rates`;
    store.dispatch(actions.updateReservedPrice(id, mealPrice, date));
    moxios.stubRequest(API_URL, {
      status: 500,
      response: { id, mealPrice, date },
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'updateReservedPrice' },
      {
        type: types.HTTP_FAILURE,
        api: 'updateReservedPrice',
        error: 'Getting users list is failed',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
