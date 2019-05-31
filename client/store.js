import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createRootReducer from './src/reducers';

export const history = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(
  persistConfig,
  createRootReducer(history), // root reducer with router state
);

const store = createStore(
  persistedReducer,
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

export const persistor = persistStore(store);
export default store;
