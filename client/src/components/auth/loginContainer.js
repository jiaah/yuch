import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
/* --- Components --- */
import LoginForm from './loginForm';
import Buttons from '../../shared/buttons';
import SignupForm from './signupForm';
import Loader from '../../shared/loader';
import { isLoggedIn, saveToken } from '../../../localStorage';
/* --- Actions --- */
import { requestLogin, requestSignup } from '../../actions/authAction';
import { showModalAction, hideModalAction } from '../../actions/modalAction';

const SimpleModal = Loader({
  loader: () =>
    import('../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.renderSignupModal = this.renderSignupModal.bind(this);
    this.handleUserSignup = this.handleUserSignup.bind(this);

    this.state = {
      submitBtnClicked: false,
      username: '',
      password: '',
      companyName: '',
      contactNumber: '',
    };
  }

  handleInputValue = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleUserLogin = async ev => {
    ev.preventDefault();
    const { username, password } = this.state;

    await this.setState({ submitBtnClicked: true });

    if (username === '' || password === '') {
      return null;
    }
    if (isLoggedIn()) {
      throw new Error('Already logged in');
    }

    const res = await this.props.requestLogin(username, password);
    await saveToken(res);
    return this.props.history.push('/');
  };

  renderSignupModal = ev => {
    ev.preventDefault();
    return this.props.showModalAction();
  };

  handleUserSignup = async ev => {
    ev.preventDefault();
    const { companyName, username, password, contactNumber } = this.state;

    await this.setState({ submitBtnClicked: true });
    if (
      username === '' ||
      password === '' ||
      companyName === '' ||
      contactNumber === ''
    ) {
      return null;
    }
    await this.props.requestSignup(
      companyName,
      username,
      password,
      contactNumber,
    );
    return console.log('User has been successfully created');
  };

  render() {
    const { submitBtnClicked, username, password } = this.state;

    return (
      <div className="tc login-container">
        <LoginForm
          handleChange={this.handleInputValue}
          submitBtnClicked={submitBtnClicked}
          username={username}
          password={password}
        />
        <Buttons
          handleFirstButtonClick={this.handleUserLogin}
          handleSecondButtonClick={this.renderSignupModal}
          firstButtonName="로그인"
          secondButtonName="가입하기"
        />
        {this.props.showModal && (
          <SimpleModal
            component={
              <SignupForm
                handleChange={this.handleInputValue}
                handleUserSignup={this.handleUserSignup}
                handleClose={() => this.props.hideModalAction()}
                submitBtnClicked={submitBtnClicked}
                inputValue={this.state}
              />
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiRequest: state.reserve.apiRequest,
  showModal: state.modal.show,
});

const mapDispatchToProps = dispatch => ({
  requestSignup: (companyName, username, password, contactNumber) =>
    dispatch(requestSignup(companyName, username, password, contactNumber)),
  requestLogin: (username, password) =>
    dispatch(requestLogin(username, password)),
  showModalAction: () => dispatch(showModalAction()),
  hideModalAction: () => dispatch(hideModalAction()),
});

export const Unwrapped = LoginContainer;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginContainer),
);
