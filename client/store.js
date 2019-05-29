import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import createRootReducer from './src/reducers';

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware,
        createLogger({
          predicate: () => process.env.NODE_ENV === 'development',
          collapsed: true,
        }),
      ),
    ),
  );

  return store;
}
