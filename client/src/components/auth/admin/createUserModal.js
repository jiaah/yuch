/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './userAccountForm';
import Loader from '../../../shared/loader';
import { addUserAccountValidation } from '../formValidation';

const Modal = Loader({
  loader: () =>
    import('../../../shared/modal' /* webpackChunkName: 'simpleModal' */),
});

const UserAccountModal = ({
  show,
  flashVariant,
  handleCloseModal,
  createUser,
  addFlashMessage,
}) => {
  const handleCreateUser = async (values, { setSubmitting, resetForm }) => {
    const {
      confirmPassword,
      bankAccountId,
      lunchQty,
      dinnerQty,
      ...others
    } = values;
    // to save values as number type in database
    const bankAccount = parseInt(bankAccountId, 10);
    const lunchQtyValue = lunchQty === '' ? null : lunchQty;
    const dinnerQtyValue = dinnerQty === '' ? null : dinnerQty;

    const userInfo = {
      bankAccount,
      lunchQtyValue,
      dinnerQtyValue,
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
        } 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다.`,
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
    lunchQty: '',
    dinnerQty: '',
    bankAccountId: '1',
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
            render={props => <Form {...props} />}
            onSubmit={handleCreateUser}
            validationSchema={addUserAccountValidation}
          />
        }
      />
    </div>
  );
};

export default UserAccountModal;
