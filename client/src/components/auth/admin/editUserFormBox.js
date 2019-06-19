/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import EditUserForm from './editUserForm';

const DeleteUserFormBox = ({
  showSubModal,
  handleCloseModal,
  addFlashMessage,
  clickedUserData,
  editUserAccountValidation,
  editUser,
}) => {
  const handleEditUser = async (values, { setSubmitting, resetForm }) => {
    const {
      companyName,
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
      const userData = await editUser(userInfo);
      await alert(`${userData} 고객정보가 수정되었습니다.`);
      await resetForm({});
      handleCloseModal();
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const values = clickedUserData || [];

  return (
    <Formik
      initialValues={values}
      render={props => <EditUserForm {...props} showSubModal={showSubModal} />}
      onSubmit={handleEditUser}
      validationSchema={editUserAccountValidation}
    />
  );
};

export default DeleteUserFormBox;
