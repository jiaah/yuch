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

const UserAccountModal = ({
  show,
  errorMessage,
  flashVariant,
  handleCloseModal,
  createUser,
  addFlashMessage,
}) => {
  const handleCreateUser = async (values, { setSubmitting, resetForm }) => {
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

    try {
      const userData = await createUser(userInfo);
      await alert(`${userData} 고객정보가 등록되었습니다.`);
      await resetForm({});
      handleCloseModal();
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${
          values.companyName
        } 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다. 서버로부터 받은 에러 메시지: ${
          errorMessage.data.detail
        }`,
      );
    }
    return setSubmitting(false);
  };

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
            render={props => <Form {...props} state={values} />}
            onSubmit={handleCreateUser}
            validationSchema={clientAccountValidation}
          />
        }
      />
    </div>
  );
};

export default UserAccountModal;
