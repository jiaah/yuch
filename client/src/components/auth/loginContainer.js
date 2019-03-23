import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import Buttons from '../../shared/buttons';
import SignupForm from './signupForm';
import Loader from '../../shared/loader';
/* --- Actions --- */
import { userLogin, userSignup } from '../../actions/authAction';
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

    this.state = {};
  }

  handleInputValue = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleUserLogin = ev => {
    ev.preventDefault();
    const { username, password } = this.state;
    return this.props.onUserLogin(username, password);
  };

  renderSignupModal = ev => {
    ev.preventDefault();
    return this.props.showModalAction();
  };

  handleUserSignup = ev => {
    ev.preventDefault();
    const { companyName, username, password, contactNumber } = this.state;
    return this.props.onUserSignup(
      companyName,
      username,
      password,
      contactNumber,
    );
  };

  render() {
    return (
      <div className="tc login-container">
        <LoginForm handleChange={this.handleInputValue} />
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
  onUserSignup: (companyName, username, password, contactNumber) =>
    dispatch(userSignup(companyName, username, password, contactNumber)),
  onUserLogin: (username, password) => dispatch(userLogin(username, password)),
  showModalAction: () => dispatch(showModalAction()),
  hideModalAction: () => dispatch(hideModalAction()),
});

export const Unwrapped = LoginContainer;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
