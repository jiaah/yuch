import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import configureStore, { history } from './store';
import Routes from './routes';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#AE9A65' },
    secondary: { main: '#ee9105' },
    success: { main: '#43A047' },
    warning: { main: '#FFA000' },
    error: { main: '#ed4337' },
    info: { main: '#2196F3' },
  },
});

const store = configureStore();
const root = document.createElement('div');
document.body.appendChild(root);

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Routes />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  root,
);
