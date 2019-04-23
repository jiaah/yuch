/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Formik } from 'formik';

/* --- Components --- */
import Button from '../../shared/button';
import Form from './userForm';
import Loader from '../../shared/loader';
import { userValidation } from './formValidation';
/* --- Actions --- */
import * as authActions from '../../actions/authAction';
import * as modalActions from '../../actions/modalAction';
import { addFlashMessage } from '../../actions/flashMessageAction';

const Modal = Loader({
  loader: () =>
    import('../../shared/modal' /* webpackChunkName: 'simpleModal' */),
});

class UsersContainer extends React.Component {
  showModal = () => this.props.modalActions.showModal();

  closeModal = () => this.props.modalActions.hideModal();

  handleCreateUser = async (values, { setSubmitting, resetForm }) => {
    const { confirmPassword, bankAccountOption, ...others } = values;
    const bankAccount = parseInt(bankAccountOption, 10);
    const userInfo = {
      bankAccount,
      ...others,
    };
    const { addFlashMessage } = this.props;
    const message1 = `${userData} 고객정보가 등록되었습니다.`;
    const message2 = `${
      values.companyName
    } 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다. 서버로부터 받은 에러 메시지: ${
      this.props.errorMessage.data.detail
    }`;

    try {
      const userData = await this.props.authActions.createUser(userInfo);
      addFlashMessage('success', message1);
      resetForm({});
      this.closeModal();
    } catch (error) {
      addFlashMessage('error', message2);
    }
    setSubmitting(false);
  };

  render() {
    const values = {
      username: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      contactNumber: '',
      email: '',
      mealPrice: '',
      lunchQuantity: '',
      dinnerQuantity: '',
      bankAccountOption: '1',
    };

    return (
      <div className="container">
        <h2>고객계정</h2>
        <Button
          typeValue="button"
          buttonName="신규등록"
          handleButtonClick={this.showModal}
          variantValue="contained"
          width="small"
          className="float-right"
        />
        {this.props.show && (
          <Modal
            show={this.props.show}
            title="신규업체 등록"
            handleClose={this.closeModal}
            component={
              <Formik
                initialValues={values}
                render={props => <Form {...props} state={this.state} />}
                onSubmit={this.handleCreateUser}
                validationSchema={userValidation}
              />
            }
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.modal.show,
  errorMessage: state.httpHandler.error,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersContainer);
