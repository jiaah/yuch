import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
/* --- Components --- */
import Form from './loginForm';
import { isLoggedIn, saveUserNameAndToken } from '../../../localStorage';
import { loginValidation } from './formValidation';
/* --- Actions --- */
import { userLogin } from '../../actions/authAction';

class Login extends React.Component {
  handleUserLogin = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;
    if (isLoggedIn()) {
      // eslint-disable-next-line no-alert
      alert('회원님은 이미 로그인 되어있습니다.');
      setSubmitting(false);
      resetForm({});
      return this.props.history.push('/');
    }
    const userData = await this.props.userLogin(username, password);
    setSubmitting(false);

    if (!userData || userData === undefined) {
      // eslint-disable-next-line no-alert
      return alert(
        '아이디 또는 비밀번호를 다시 확인하세요. 아이디 또는 비밀번호를 잘못 입력하셨습니다.',
      );
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
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
