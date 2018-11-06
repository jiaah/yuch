import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Store from './store';
import Routes from './routes';
import { firebase } from './src/firebase/firebase';

const root = document.createElement('div');
document.body.appendChild(root);
const theme = createMuiTheme({
  palette: {
    primary: { main: '#AE9A65' },
    secondary: { main: '#ee9105' },
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

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('Log in');
  } else {
    console.log('Log out');
  }
});
