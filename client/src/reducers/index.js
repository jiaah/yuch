import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import reserve from './reserveReducer';
import modal from './modalReducer';
import HTTPRequestHandler from './HTTPRequestHandlerReducer';

export default combineReducers({
  modal,
  reserve,
  HTTPRequestHandler,
  routing: routerReducer,
});
