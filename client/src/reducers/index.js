import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import modal from './modalReducer';
import httpHandler from './httpHandlerReducer';
import flashMessage from './flashMessageReducer';

export default combineReducers({
  modal,
  httpHandler,
  flashMessage,
  routing: routerReducer,
});
