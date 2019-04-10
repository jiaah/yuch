import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import SingleButton from '../../shared/singleButton';
import UserForm from './userForm';
import Loader from '../../shared/loader';
import { signUpInputChecker } from './inputChecker';
/* --- Actions --- */
import * as authActions from '../../actions/authAction';
import * as modalActions from '../../actions/modalAction';

const SimpleModal = Loader({
  loader: () =>
    import('../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});

class UsersContainer extends React.Component {
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

  showModal = ev => {
    ev.preventDefault();
    return this.props.modalActions.showModal();
  };

  hideModal = ev => {
    ev.preventDefault();
    return this.props.modalActions.hideModal();
  };

  handleCreateUser = async ev => {
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
    return this.props.authActions.createUser(userInfo);
  };

  render() {
    const { submitBtnClicked } = this.state;
    return (
      <div>
        <h1>고객계정</h1>
        <SingleButton
          handleButtonClick={this.showModal}
          variantType="contained"
          buttonName="신규등록"
        />
        {this.props.showModal && (
          <SimpleModal
            component={
              <UserForm
                handleChange={this.handleInputValue}
                handleCreateUser={this.handleCreateUser}
                handleClose={this.hideModal}
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
  showModal: state.modal.show,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer);
