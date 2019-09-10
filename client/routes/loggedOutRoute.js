import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
/* --- Components --- */
import { isLoggedIn } from '../localStorage';
/* --- Actions --- */
import { userLogout } from '../src/actions/authAction';

// to block login page to loggedIn user
const LoggedInRoute = ({
  httpStatus,
  id,
  userLogout,
  component: Component,
  ...rest
}) => (
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

const mapPropsToState = state => ({
  keepMeLoggedIn: state.auth.keepMeLoggedIn,
  isLoggedIn: state.auth.isLoggedIn,
  isAdmin: state.auth.isAdmin,
  id: state.auth.id,
  httpStatus: state.httpHandler.status,
});

const mapDispatchToProps = dispatch => ({
  userLogout: id => dispatch(userLogout(id)),
});

export default connect(
  mapPropsToState,
  mapDispatchToProps,
)(LoggedInRoute);
