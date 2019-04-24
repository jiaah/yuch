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
    const {
      confirmPassword,
      bankAccountOption,
      lunchQuantityValue,
      dinnerQuantityValue,
      ...others
    } = values;
    // to save values as number type in database
    const bankAccount = parseInt(bankAccountOption, 10);
    const lunchQuantity = lunchQuantityValue === '' ? 0 : lunchQuantityValue;
    const dinnerQuantity = dinnerQuantityValue === '' ? 0 : dinnerQuantityValue;

    const userInfo = {
      bankAccount,
      lunchQuantity,
      dinnerQuantity,
      ...others,
    };
    const { addFlashMessage } = this.props;

    try {
      const userData = await this.props.authActions.createUser(userInfo);
      await addFlashMessage(
        'success',
        `${userData} 고객정보가 등록되었습니다.`,
      );
      await resetForm({});
      // calling 'closeModal action' will cause an error of 'can not perform a react state update on unmounted component.'
    } catch (error) {
      await addFlashMessage(
        'error',
        `${
          values.companyName
        } 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다. 서버로부터 받은 에러 메시지: ${
          this.props.errorMessage.data.detail
        }`,
      );
    }
    return setSubmitting(false);
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
      lunchQuantityValue: '',
      dinnerQuantityValue: '',
      bankAccountOption: '1',
    };

    const { show, flashVariant } = this.props;
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
        {show && (
          <Modal
            show={show}
            flashVariant={flashVariant}
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
  flashVariant: state.flashMessage.variant,
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
