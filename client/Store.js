import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import Reducers from './src/reducers';

const routMiddleware = routerMiddleware(createHistory());

const Store = createStore(
  Reducers,
  composeWithDevTools(
    applyMiddleware(
      routMiddleware,
      thunkMiddleware,
      createLogger({
        predicate: () => process.env.NODE_ENV === 'development',
        collapsed: true,
      }),
    ),
  ),
);

export default Store;
