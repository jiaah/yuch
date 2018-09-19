import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { deepPurple500 } from '@material-ui/core/colors';
import Store from './store';
import Routes from './routes';

const root = document.createElement('div');
document.body.appendChild(root);
const theme = createMuiTheme({
  palette: {
    primary: { main: '#AE9A65' },
    secondary: { main: '#866586' },
  },
});

render(
  <Provider store={Store}>
    <MuiThemeProvider theme={theme}>
      <Router history={createHistory()}>
        <Routes />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  root,
);
