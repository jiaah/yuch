import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
/* --- Components --- */
import LoginForm from './loginForm';
import Buttons from '../../shared/buttons';
import SignupForm from './signupForm';
import Loader from '../../shared/loader';
import { isLoggedIn, saveToken } from '../../../localStorage';
import { signUpInputChecker, loginInputChecker } from './inputChecker';
/* --- Actions --- */
import * as authActions from '../../actions/authAction';
import * as modalActions from '../../actions/modalAction';

const SimpleModal = Loader({
  loader: () =>
    import('../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});
class LoginContainer extends React.Component {
  constructor(props) {
    super(props);

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

  renderSignupModal = ev => {
    ev.preventDefault();
    return this.props.modalActions.showModal();
  };

  handleUserSignup = async ev => {
    ev.preventDefault();
    const { submitBtnClicked, ...others } = this.state;
    const userInfo = { ...others };

    // this state need to be set first for input error checking
    await this.setState({ submitBtnClicked: true });

    // Input fields error's checked in the form,
    // this requires to prevent from making unnecessary http request
    const isInputFilledOut = await signUpInputChecker(userInfo);
    if (isInputFilledOut === null) {
      return null;
    }
    return this.props.authActions.requestSignup(userInfo);
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
    const res = await this.props.authActions.requestLogin(username, password);
    await saveToken(res);
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
                handleClose={() => this.props.modalActions.hideModal()}
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
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
});

export const Unwrapped = LoginContainer;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoginContainer),
);
