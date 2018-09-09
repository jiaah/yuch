import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import reserve from './reserve/reserve.reducer';

export default combineReducers({
  reserve,
  routing: routerReducer,
});
