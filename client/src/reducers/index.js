import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import reserve from './reserveReducer';
import { modalReducer as modal } from './modalModule';

export default combineReducers({
  modal,
  reserve,
  routing: routerReducer,
});
