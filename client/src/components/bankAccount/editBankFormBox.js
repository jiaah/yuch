import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import BankForm from './bankForm';

const EditBankFormBox = ({
  bankAccountValidation,
  editBankAccount,
  handleCloseModal,
  addFlashMessage,
  clickedUserData,
}) => {
  const handleEditBankAccount = async (
    values,
    { setSubmitting, resetForm },
  ) => {
    try {
      await editBankAccount(values);
      await Promise.all([resetForm({}), handleCloseModal()]);
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${
          values.accountHolder
        } 님의 은행계좌 수정에 실패하였습니다. 다시 시도해주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <Formik
      initialValues={clickedUserData[0]}
      render={props => <BankForm {...props} />}
      onSubmit={handleEditBankAccount}
      validationSchema={bankAccountValidation}
    />
  );
};

export default EditBankFormBox;
