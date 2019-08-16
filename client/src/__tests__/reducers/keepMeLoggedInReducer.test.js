import keepLoggedInReducer from '../../reducers/keepMeLoggedInReducer';
import * as types from '../../actions/actionTypes';

test("set if user select 'keepMeLoggedIn' checkbox", () => {
  let state;
  const newState = keepLoggedInReducer((state = { keepUserLoggedIn: false }), {
    type: types.KEEP_ME_LOGGED_IN,
  });
  expect(newState).toEqual({
    ...state,
    keepUserLoggedIn: !state.keepUserLoggedIn,
  });
});
