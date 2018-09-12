import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
/* --- Components --- */
import componentsReducer from './src/components/reducer';

export default combineReducers({
  componentsReducer,
  routing: routerReducer,
});
