import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import SingleButton from '../../shared/singleButton';
import UserForm from './userForm';
import Loader from '../../shared/loader';
import { userAccountInputChecker } from './inputChecker';
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
      confirmPassword: '',
      companyName: '',
      contactNumber: '',
      mealPrice: '',
      checkedA: '',
      checkedB: '',
      bankAccount: '',
    };
  }

  handleInputValue = ({ target: { id, value } }) => {
    this.setState({ [id]: value });
  };

  handleCheckbox = name => () => {
    if (name === 'checkedA') {
      if (this.state.checkedA) {
        return null;
      }
      return this.setState({
        checkedA: true,
        checkedB: false,
        bankAccount: 'A',
      });
    }
    if (name === 'checkedB') {
      if (this.state.checkedB) {
        return null;
      }
      return this.setState({
        checkedA: false,
        checkedB: true,
        bankAccount: 'B',
      });
    }
  };

  showModal = ev => {
    ev.preventDefault();
    if (this.state.bankAccount === '') {
      this.setState({
        checkedA: true,
        checkedB: false,
        bankAccount: 'A',
      });
    }
    return this.props.modalActions.showModal();
  };

  hideModal = ev => {
    ev.preventDefault();
    this.props.modalActions.hideModal();
    return this.setState({ submitBtnClicked: false });
  };

  handleCreateUser = async ev => {
    ev.preventDefault();
    const {
      submitBtnClicked,
      username,
      password,
      confirmPassword,
      companyName,
      contactNumber,
      mealPrice,
      bankAccount,
    } = this.state;
    const userInputValue = {
      username,
      password,
      confirmPassword,
      companyName,
      contactNumber,
      mealPrice,
    };
    const userInfo = {
      username,
      password,
      companyName,
      contactNumber,
      mealPrice,
      bankAccount,
    };

    // this state need to be set first for input error checking
    await this.setState({ submitBtnClicked: true });

    // Input fields error's checked in the form,
    // this requires to prevent from making unnecessary http request
    const isInputFilledOut = await userAccountInputChecker(userInputValue);
    if (isInputFilledOut !== null) {
      return this.props.authActions.createUser(userInfo);
    }
    return null;
  };

  render() {
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
                handleCheckbox={this.handleCheckbox}
                handleCreateUser={this.handleCreateUser}
                handleClose={this.hideModal}
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
