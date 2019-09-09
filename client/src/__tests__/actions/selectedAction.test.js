import moxios from 'moxios';
import { Axios } from '../../actions/axios';
import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/selectedAction';
import { mockStore } from '../setupTests';
import { id, companyName, email, contactNo } from '../__mocks__/mockData';

const clickedData = [{ id, companyName, contactNo, email }];
const store = mockStore({});

describe('async selecte request actions', () => {
  beforeEach(() => {
    store.clearActions();
    moxios.install(Axios);
  });
  afterEach(() => {
    moxios.uninstall(Axios);
  });

  it('saves selected item value', () => {
    store.dispatch(actions.saveSelectedItemValue('yuchung'));
    const expectedActions = [
      { type: types.SAVE_SELECTED_ITEM_VALUE, value: 'yuchung' },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('resets selected item value', () => {
    store.dispatch(actions.resetSelectedItemValue());
    const expectedActions = [{ type: types.RESET_SELECTED_ITEM_VALUE }];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('saves clicked item data', () => {
    store.dispatch(actions.saveClickedItemData(clickedData));
    const expectedActions = [
      { type: types.SAVE_CLICKED_ITEM_DATA, data: clickedData },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('resets clicked item data', () => {
    store.dispatch(actions.resetClickedItemData(clickedData));
    const expectedActions = [{ type: types.RESET_CLICKED_ITEM_DATA }];
    expect(store.getActions()).toEqual(expectedActions);
  });
});
