/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './userAccountForm';
import Loader from '../../../shared/loader';
import { clientAccountValidation } from '../formValidation';

const Modal = Loader({
  loader: () =>
    import('../../../shared/modal' /* webpackChunkName: 'simpleModal' */),
});

class UserAccountModal extends React.Component {
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
    const { addFlashMessage, createUser } = this.props;

    try {
      const userData = await createUser(userInfo);
      await alert(`${userData} 고객정보가 등록되었습니다.`);
      await resetForm({});
      this.closeModal();
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
    const { show, flashVariant, handleCloseModal } = this.props;

    return (
      <div className="container">
        <Modal
          show={show}
          flashVariant={flashVariant}
          title="신규업체 등록"
          handleClose={handleCloseModal}
          component={
            <Formik
              initialValues={values}
              render={props => <Form {...props} state={this.state} />}
              onSubmit={this.handleCreateUser}
              validationSchema={clientAccountValidation}
            />
          }
        />
      </div>
    );
  }
}

export default UserAccountModal;
