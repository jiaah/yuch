import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import modal from './modalReducer';
import httpHandler from './httpHandlerReducer';

export default combineReducers({
  modal,
  httpHandler,
  routing: routerReducer,
});
