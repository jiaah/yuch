/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
/* --- Components --- */
import Button from '../../shared/button';
import Form from './userForm';
import Loader from '../../shared/loader';
import { userAccountInputChecker } from './inputChecker';
/* --- Actions --- */
import * as authActions from '../../actions/authAction';
import * as modalActions from '../../actions/modalAction';

const SimpleModal = Loader({
  loader: () =>
    import('../../shared/simpleModal' /* webpackChunkName: 'simpleModal' */),
});

const validationSchema = {};

class UsersContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitBtnClicked: false,
      checkedA: '',
      checkedB: '',
      bankAccount: '',
    };
  }

  handleCheckbox = name => () => {
    if (name === 'checkedA') {
      if (this.state.checkedA) {
        return null;
      }
      return this.setState({
        checkedA: true,
        checkedB: false,
        bankAccount: 1,
      });
    }
    if (name === 'checkedB') {
      if (this.state.checkedB) {
        return null;
      }
      return this.setState({
        checkedA: false,
        checkedB: true,
        bankAccount: 2,
      });
    }
  };

  showModal = ev => {
    ev.preventDefault();
    if (this.state.bankAccount === '') {
      this.setState({
        checkedA: true,
        checkedB: false,
        bankAccount: 1,
      });
    }
    return this.props.modalActions.showModal();
  };

  handleClose = ev => {
    ev.preventDefault();
    this.props.modalActions.hideModal();
    return this.setState({ submitBtnClicked: false });
  };

  handleCreateUser = async (values, actions) => {
    const { confirmPassword, ...others } = values;
    const { submitBtnClicked, bankAccount } = this.state;
    const userInfo = {
      ...others,
      bankAccount,
    };
    // this state need to be set first for input error checking
    await this.setState({ submitBtnClicked: true });

    // Input fields error's checked in the form,
    // this requires to prevent from making unnecessary http request
    const isInputFilledOut = await userAccountInputChecker(values);

    if (isInputFilledOut !== null) {
      const userData = await this.props.authActions.createUser(userInfo);
      if (!userData || userData === undefined) {
        alert(
          `${
            values.companyName
          } 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다. 서버로부터 받은 에러 메시지: ${
            this.props.errorMessage.data.detail
          }`,
        );
        return actions.setSubmitting(false);
      }
      await alert(`${userData} 고객정보가 등록되었습니다.`);
      return actions.setSubmitting(false);
    }
  };

  render() {
    const values = {
      username: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      contactNumber: '',
      mealPrice: '',
      lunchQuantity: '',
      dinnerQuantity: '',
    };
    return (
      <div className="users-container">
        <h1>고객계정</h1>
        <Button
          typeValue="button"
          buttonName="신규등록"
          handleButtonClick={this.showModal}
          variantValue="contained"
          width="medium"
        />
        {this.props.showModal && (
          <SimpleModal
            component={
              <Formik
                initialValues={values}
                render={props => (
                  <Form
                    {...props}
                    state={this.state}
                    handleCheckbox={this.handleCheckbox}
                    handleClose={this.handleClose}
                  />
                )}
                onSubmit={this.handleCreateUser}
                validationSchema={validationSchema}
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
  errorMessage: state.httpHandler.error,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer);
