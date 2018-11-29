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
          handleFirstButtonClick={this.handleUserLogin}
          handleSecondButtonClick={this.renderRegisterPage}
          firstButtonName="로그인"
          secondButtonName="가입하기"
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
