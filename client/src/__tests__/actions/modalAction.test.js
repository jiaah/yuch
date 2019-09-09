import moxios from 'moxios';
import { Axios } from '../../actions/axios';
import * as types from '../../actions/actionTypes';
import { hideModal, showModal } from '../../actions/modalAction';
import { mockStore } from '../setupTests';

const store = mockStore({});

describe('async modal request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install(Axios);
  });

  afterEach(() => {
    moxios.uninstall(Axios);
  });

  it('should call hide modal action', () => {
    store.dispatch(hideModal());
    const expectedActions = [{ type: types.HIDE_MODAL }];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should call show modal action', () => {
    store.dispatch(showModal());
    const expectedActions = [{ type: types.SHOW_MODAL }];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
