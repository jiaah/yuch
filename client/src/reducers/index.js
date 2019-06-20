import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
/* --- Components --- */
import modal from './modalReducer';
import httpHandler from './HTTPHandlerReducer';
import message from './messageReducer';
import auth from './authReducer';
import user from './userReducer';
import selectedItem from './selectedItemReducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    modal,
    httpHandler,
    message,
    auth,
    user,
    selectedItem,
  });
