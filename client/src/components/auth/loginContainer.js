import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import Buttons from '../../shared/buttons';
import SignupAuth from './signupAuth';
import Loader from '../../shared/loader';
/* --- Actions --- */
// import { startLogin } from '../../actions/loginAction';
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
    this.renderRegisterPage = this.renderRegisterPage.bind(this);
  }

  handleInputValue = ({ target: { id, value } }) => {
    console.log('id: ', id);
    console.log('value: ', value);
  };

  handleUserLogin = ev => {
    ev.preventDefault();
    return this.props.showModalAction();
    // this.props.onStartLogin();
  };

  renderRegisterPage = ev => {
    ev.preventDefault();
    return this.props.showModalAction();
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
        {this.props.showModal && (
          <SimpleModal
            component={
              <SignupAuth handleClose={() => this.props.hideModalAction()} />
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
  // onStartLogin: () => dispatch(startLogin()),
  showModalAction: () => dispatch(showModalAction()),
  hideModalAction: () => dispatch(hideModalAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
