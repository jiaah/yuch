import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './src/reducers';

export const history = createBrowserHistory();

const middlewares = [
  routerMiddleware(history), // for dispatching history actions
  thunkMiddleware,
  createLogger({
    predicate: () => process.env.NODE_ENV === 'development',
    collapsed: true,
  }),
];
const enhancers = [applyMiddleware(...middlewares)];

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['router'],
};
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer(history), // root reducer with router state
);

export default preloadedState => {
  const store = createStore(
    persistedReducer,
    preloadedState,
    composeWithDevTools(...enhancers),
  );
  const persistor = persistStore(store);
  return { store, persistor };
};
