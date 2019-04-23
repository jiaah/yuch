import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
/* --- Components --- */
import Form from './loginForm';
import { isLoggedIn, saveUserNameAndToken } from '../../../localStorage';
import { loginValidation } from './formValidation';
import * as data from '../../shared/data';
/* --- Actions --- */
import { userLogin } from '../../actions/authAction';
import { addFlashMessage } from '../../actions/flashMessageAction';

class Login extends React.Component {
  handleUserLogin = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;
    const { addFlashMessage } = this.props;
    if (isLoggedIn()) {
      addFlashMessage('isAlreadyLoggedIn');
      setSubmitting(false);
      resetForm({});
      return this.props.history.push('/');
    }
    const userData = await this.props.userLogin(username, password);
    setSubmitting(false);

    if (!userData || userData === undefined) {
      return addFlashMessage('loginFailed');
    }
    await saveUserNameAndToken(userData);
    resetForm({});
    return this.props.history.push('/');
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
  addFlashMessage: status => dispatch(addFlashMessage(status)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
