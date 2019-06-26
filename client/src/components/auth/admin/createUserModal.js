/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './createUserForm';
import Modal from '../../../shared/modal';
import { addUserAccountValidation } from '../formValidation';

const UserAccountModal = ({
  show,
  handleCloseModal,
  createUser,
  addFlashMessage,
  messageShow,
  selectedSearchItem,
  resetSelectedItemValue,
}) => {
  const handleCreateUser = async (values, { setSubmitting, resetForm }) => {
    const {
      companyName,
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
      companyName,
      bankAccountId: bankAccount,
      lunchQty: lunchQtyValue,
      dinnerQty: dinnerQtyValue,
      ...others,
    };

    try {
      await createUser(userInfo);
      await Promise.all([
        resetForm({}),
        handleCloseModal(),
        selectedSearchItem !== null ? resetSelectedItemValue() : null, // to display all users list from a selected user list [Search]
      ]);
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다.`,
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
        messageShow={messageShow}
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
