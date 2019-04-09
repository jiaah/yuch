import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import reserve from './reserveReducer';
import modal from './modalReducer';
import httpHandler from './HTTPHandlerReducer';

export default combineReducers({
  modal,
  reserve,
  httpHandler,
  routing: routerReducer,
});
