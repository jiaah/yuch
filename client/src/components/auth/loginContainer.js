import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import Buttons from '../../shared/buttons';
/* --- Actions --- */
// import { startLogin } from '../../actions/loginAction';

class LoginContainer extends React.Component {
  constructor() {
    super();
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.renderRegisterPage = this.renderRegisterPage.bind(this);
  }

  handleInputValue = ({ target: { id, value } }) => {
    console.log('id: ', id);
    console.log('value: ', value);
  };

  handleUserLogin = ev => {
    ev.preventDefault();
    console.log('login clicked');
    // this.props.onStartLogin();
  };

  renderRegisterPage = ev => {
    ev.preventDefault();
    console.log('renderRegisterPage');
  };

  render() {
    return (
      <div className="tc login-container">
        <LoginForm handleChange={this.handleInputValue} />
        <Buttons
          handleClick={this.handleUserLogin}
          variantValue="outlined"
          colorValue="secondary"
          name="로그인"
          classNameValue="button"
        />
        <Buttons
          handleClick={this.renderRegisterPage}
          variantValue="contained"
          colorValue="secondary"
          name="가입하기"
          classNameValue="button"
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  // onStartLogin: () => dispatch(startLogin()),
});

export default connect(
  undefined,
  mapDispatchToProps,
)(LoginContainer);
