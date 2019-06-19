import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
/* --- Components --- */

import Form from './loginForm';
import { isLoggedIn, saveUserToken } from '../../../localStorage';
import { loginValidation } from './formValidation';
import * as data from '../../shared/data';
/* --- Actions --- */
import { userLogin } from '../../actions/authAction';
import { addFlashMessage } from '../../actions/messageAction';

class Login extends React.Component {
  handleUserLogin = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;
    const { addFlashMessage } = this.props;
    const { loggedInUser, loginFailed } = data.message.auth;

    if (isLoggedIn()) {
      await addFlashMessage('warning', loggedInUser);
      resetForm({});
      this.props.history.push('/');
      return setSubmitting(false);
    }

    try {
      const token = await this.props.userLogin(username, password);
      await saveUserToken(token);
      await resetForm({});
      this.props.history.push('/');
    } catch (error) {
      await addFlashMessage('error', loginFailed);
    }
    return setSubmitting(false);
  };

  render() {
    const values = { username: '', password: '' };

    return (
      <React.Fragment>
        <Formik
          initialValues={values}
          render={props => <Form {...props} />}
          onSubmit={this.handleUserLogin}
          validationSchema={loginValidation}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
