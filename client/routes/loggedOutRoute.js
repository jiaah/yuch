import React from 'react';
import { Redirect, Route } from 'react-router-dom';
/* --- Components --- */
import { isLoggedIn } from '../localStorage';

// to block login page to loggedIn user
const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default LoggedInRoute;
