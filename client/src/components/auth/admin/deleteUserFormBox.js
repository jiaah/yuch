/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import DeleteUserForm from './deleteUserForm';

const DeleteUserFormBox = ({
  handleCloseModal,
  addFlashMessage,
  closeSubModal,
  deleteUser,
  passwordValidation,
  clickedUserData,
}) => {
  const handleDeleteUser = async (values, { setSubmitting, resetForm }) => {
    const { password } = values;
    const { id, companyName } = clickedUserData;
    try {
      // pass userId to be deleted & admin user password
      await deleteUser(id, password);
      await alert(`${companyName} 고객 계정이 삭제되었습니다.`);
      await Promise.all([resetForm({}), closeSubModal(), handleCloseModal()]);
      return window.location.reload(true);
    } catch (err) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 계정 삭제에 실패하였습니다. 비밀번호를 확인해주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const deleteValues = {
    password: '',
  };

  return (
    <Formik
      initialValues={deleteValues}
      render={props => <DeleteUserForm {...props} />}
      onSubmit={handleDeleteUser}
      validationSchema={passwordValidation}
    />
  );
};

export default DeleteUserFormBox;
