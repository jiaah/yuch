import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import reservation from './reserve/reserve.reducer';

export default combineReducers({
  reservation,
  routing: routerReducer,
});
