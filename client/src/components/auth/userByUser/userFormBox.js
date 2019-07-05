import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import UserForm from './userForm';

const UserFormBox = ({
  userData,
  editUserAccountValidation,
  editAdminAccount,
  addFlashMessage,
  openPasswordForm,
}) => {
  const handleEditAdmin = async (values, { setSubmitting }) => {
    const { id, companyName } = userData;
    try {
      await editAdminAccount(id, values);
      await addFlashMessage(
        'success',
        `${companyName}님의 계정이 수정되었습니다.`,
      );
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName}님의 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <Formik
      initialValues={userData}
      render={props => (
        <UserForm {...props} openPasswordForm={openPasswordForm} />
      )}
      onSubmit={handleEditAdmin}
      validationSchema={editUserAccountValidation}
    />
  );
};

export default UserFormBox;
