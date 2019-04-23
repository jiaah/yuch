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
    const message1 =
      '아이디 또는 비밀번호를 다시 확인하세요. 아이디 또는 비밀번호를 잘못 입력하셨습니다.';
    const message2 = '회원님은 이미 로그인 되어있습니다.';

    if (isLoggedIn()) {
      addFlashMessage('error', message1);
      setSubmitting(false);
      resetForm({});
      return this.props.history.push('/');
    }
    const userData = await this.props.userLogin(username, password);
    setSubmitting(false);

    if (!userData || userData === undefined) {
      return addFlashMessage('warning', message2);
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
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
