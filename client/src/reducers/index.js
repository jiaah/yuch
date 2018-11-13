import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import reserve from './reserveReducer';
import modal from './modalReducer';

export default combineReducers({
  modal,
  reserve,
  routing: routerReducer,
});
