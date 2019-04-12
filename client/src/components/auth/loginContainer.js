import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import Buttons from '../../shared/buttons';
import { isLoggedIn, saveUserNameAndToken } from '../../../localStorage';
import { loginInputChecker } from './inputChecker';
/* --- Actions --- */
import { userLogin } from '../../actions/authAction';

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitBtnClicked: false,
      username: '',
      password: '',
    };
  }

  handleInputValue = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  renderHomepage = ev => {
    ev.preventDefault();
    this.props.history.push('/');
  };

  handleUserLogin = async ev => {
    ev.preventDefault();
    const { username, password } = this.state;

    await this.setState({ submitBtnClicked: true });
    const isInputFilledOut = await loginInputChecker(username, password);
    if (isInputFilledOut === null) {
      return null;
    }
    if (isLoggedIn()) {
      throw new Error('Already logged in');
    }
    const userData = await this.props.userLogin(username, password);
    if (!userData || userData === undefined) {
      return null;
    }

    await saveUserNameAndToken(userData);
    return this.props.history.push('/');
  };

  render() {
    const { submitBtnClicked, username, password } = this.state;
    return (
      <div className="tc login-container">
        <LoginForm
          handleChange={this.handleInputValue}
          handleUserLogin={this.handleUserLogin}
          submitBtnClicked={submitBtnClicked}
          username={username}
          password={password}
        />
        <Buttons
          handleFirstButtonClick={this.handleUserLogin}
          handleSecondButtonClick={this.renderHomepage}
          firstButtonName="로그인"
          secondButtonName="홈페이지"
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
});

export const Unwrapped = LoginContainer;
export default connect(
  null,
  mapDispatchToProps,
)(LoginContainer);
