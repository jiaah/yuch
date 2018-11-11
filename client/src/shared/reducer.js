import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import { reserveReducer as reserve } from '../features/reserve/reserve';
import { modalReducer as modal } from './modalModule';

export default combineReducers({
  modal,
  reserve,
  routing: routerReducer,
});
