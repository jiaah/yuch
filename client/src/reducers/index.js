import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Test from './example';

export default combineReducers({
  test: Test,
  routing: routerReducer,
});
