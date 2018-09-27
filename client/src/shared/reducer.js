import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import { reducer as reserve } from '../features/reserve/reserve';

export default combineReducers({
  reserve,
  routing: routerReducer,
});
