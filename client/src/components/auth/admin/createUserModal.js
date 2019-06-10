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
      lunchQtyValue,
      dinnerQtyValue,
      ...others
    } = values;
    // to save values as number type in database
    const bankAccount = parseInt(bankAccountOption, 10);
    const lunchQty = lunchQtyValue === '' ? 0 : lunchQtyValue;
    const dinnerQty = dinnerQtyValue === '' ? 0 : dinnerQtyValue;

    const userInfo = {
      bankAccount,
      lunchQty,
      dinnerQty,
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
    contactNo: '',
    email: '',
    mealPrice: '',
    lunchQtyValue: '',
    dinnerQtyValue: '',
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
