import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
/* --- Components --- */
import modal from './modalReducer';
import httpHandler from './HTTPHandlerReducer';
import message from './messageReducer';
import auth from './authReducer';
import isAdminVerified from './isAdminVerifiedReducer';
import selected from './selectedReducer';
import userCatering from './userCatering';
import dateTracker from './dateTracker';

export default history =>
  combineReducers({
    router: connectRouter(history),
    modal,
    httpHandler,
    message,
    auth,
    isAdminVerified,
    selected,
    userCatering,
    dateTracker,
  });
