import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
/* --- Components --- */
import { isLoggedIn } from '../localStorage';

// to block login page to loggedIn user
const LoggedInRoute = ({ isLoggedInState, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      // 'token in localStorage && isLoggedIn state' both must be true.
      isLoggedIn() && isLoggedInState ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = state => ({
  isLoggedInState: state.auth.isLoggedIn,
});
export default connect(
  mapStateToProps,
  null,
)(LoggedInRoute);
