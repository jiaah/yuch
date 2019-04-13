import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
/* --- Components --- */
import Form from './loginForm';
import { isLoggedIn, saveUserNameAndToken } from '../../../localStorage';
/* --- Actions --- */
import { userLogin } from '../../actions/authAction';

const validationSchema = Yup.object({
  username: Yup.string('').required('아이디를 입력하세요.'),
  password: Yup.string('')
    .min(8, '비밀번호는 8자 이상이여야 합니다.')
    .required('비밀번호를 입력하세요.'),
});

class Login extends React.Component {
  handleUserLogin = async (values, actions) => {
    const { username, password } = values;
    if (isLoggedIn()) {
      throw new Error('Already logged in');
    }
    const userData = await this.props.userLogin(username, password);
    await actions.setSubmitting(false);

    if (!userData || userData === undefined) {
      // eslint-disable-next-line no-alert
      alert(
        '아이디 또는 비밀번호를 다시 확인하세요. 아이디 또는 비밀번호를 잘못 입력하셨습니다.',
      );
      return null;
    }
    await saveUserNameAndToken(userData);
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
          validationSchema={validationSchema}
        />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
