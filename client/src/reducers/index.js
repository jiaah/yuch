import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import reserve from './reserveReducer';
import modal from './modalReducer';
import auth from './authReducer';

export default combineReducers({
  modal,
  reserve,
  auth,
  routing: routerReducer,
});
