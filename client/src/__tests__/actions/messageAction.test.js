import moxios from 'moxios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/messageAction';
import { mockStore } from '../setupTests';

const store = mockStore({});

describe('async message request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('add flash message', () => {
    const variant = 'success';
    const message = 'The reservation is made';

    store.dispatch(actions.addFlashMessage(variant, message));
    const expectedActions = [
      { type: types.ADD_FLASH_MESSAGE, variant, message },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('removes flash message', () => {
    store.dispatch(actions.removeFlashMessage());
    const expectedActions = [{ type: types.DELETE_FLASH_MESSAGE }];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
