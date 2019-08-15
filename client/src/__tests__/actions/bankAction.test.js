import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/bankAction';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';
import { bankInfo } from '../__mocks__/mockData';

const store = mockStore({});

describe('async bank actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('receives bank accounts on success', done => {
    const API_URL = `${API_HOST}/admin/bankaccount`;
    store.dispatch(actions.getBankAccount());
    moxios.stubRequest(API_URL, {
      status: 200,
      response: bankInfo,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getBankAccount' },
      { type: types.HTTP_SUCCESS, api: 'getBankAccount' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('getting bank accounts fails', done => {
    const API_URL = `${API_HOST}/admin/bankaccount`;
    store.dispatch(actions.getBankAccount());
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'getBankAccount' },
      {
        type: types.HTTP_FAILURE,
        api: 'getBankAccount',
        error: 'Getting the bank account list is failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('creates a bank account on success', done => {
    const API_URL = `${API_HOST}/admin/bankaccount`;
    store.dispatch(actions.createBankAccount());
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'createBankAccount' },
      { type: types.HTTP_SUCCESS, api: 'createBankAccount' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('creating a bank account fails', done => {
    const API_URL = `${API_HOST}/admin/bankaccount`;
    store.dispatch(actions.createBankAccount());
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'createBankAccount' },
      {
        type: types.HTTP_FAILURE,
        api: 'createBankAccount',
        error: 'Creating the bank account is failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('edits a bank account on success', done => {
    const API_URL = `${API_HOST}/admin/bankaccount/${bankInfo.id}`;
    store.dispatch(actions.editBankAccount(bankInfo));
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editBankAccount' },
      { type: types.HTTP_SUCCESS, api: 'editBankAccount' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('editing a bank account fails', done => {
    const API_URL = `${API_HOST}/admin/bankaccount/${bankInfo.id}`;
    store.dispatch(actions.editBankAccount(bankInfo));
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'editBankAccount' },
      {
        type: types.HTTP_FAILURE,
        api: 'editBankAccount',
        error: 'Editing the bank account is failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('deletes a bank account on success', done => {
    const API_URL = `${API_HOST}/admin/bankaccount/${bankInfo.id}`;
    store.dispatch(actions.deleteBankAccount(bankInfo.id));
    moxios.stubRequest(API_URL, {
      status: 200,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'deleteBankAccount' },
      { type: types.HTTP_SUCCESS, api: 'deleteBankAccount' },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
  it('deleting a bank account fails', done => {
    const API_URL = `${API_HOST}/admin/bankaccount/${bankInfo.id}`;
    store.dispatch(actions.deleteBankAccount(bankInfo.id));
    moxios.stubRequest(API_URL, {
      status: 500,
    });
    const expectedActions = [
      { type: types.HTTP_REQUEST, api: 'deleteBankAccount' },
      {
        type: types.HTTP_FAILURE,
        api: 'deleteBankAccount',
        error: 'Deleting the bank account is failed.',
      },
    ];
    moxios.wait(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
