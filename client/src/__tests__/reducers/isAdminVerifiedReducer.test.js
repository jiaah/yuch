import isAdminVerifiedReducer from '../../reducers/isAdminVerifiedReducer';
import * as types from '../../actions/actionTypes';

test('set if admin user is verified', () => {
  let state;
  const newState = isAdminVerifiedReducer(
    (state = { isAdminVerified: false }),
    {
      type: types.IS_ADMIN_VERIFIED,
    },
  );
  expect(newState).toEqual({
    ...state,
    isAdminVerified: !state.isAdminVerified,
  });
});
