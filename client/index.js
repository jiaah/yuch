// IE old browser support
import 'core-js';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore, { history } from './store';
import Routes from './routes/routes';
import Loading from './src/shared/loading';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ee9105' },
    secondary: { main: '#E8716F' },
    success: { main: '#43A047' },
    warning: { main: '#FFA000' },
    error: { main: '#ed4337' },
    info: { main: '#2196F3' },
  },
  overrides: {
    MuiInputBase: {
      input: { paddingLeft: 10 },
    },
  },
});

const { store, persistor } = configureStore();

const root = document.createElement('div');
document.body.appendChild(root);

render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
        </Router>
      </MuiThemeProvider>
    </PersistGate>
  </Provider>,
  root,
);
