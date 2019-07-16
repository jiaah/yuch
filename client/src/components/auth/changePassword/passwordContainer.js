import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import PasswordForm from './passwordForm';

const PasswordFormBox = ({
  userData,
  changePasswordValidation,
  // actions
  changePassword,
  addFlashMessage,
  // close password form
  closePasswordForm,
}) => {
  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    const { password, newPassword } = values;
    const { id, companyName } = userData;
    try {
      await changePassword(id, password, newPassword);
      await addFlashMessage(
        'success',
        `${companyName}님의 계정 비밀번호가 수정되었습니다.`,
      );
      closePasswordForm();
      resetForm();
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName}님의 계정 비밀번호 수정에 실패하였습니다. 비밀번호를 확인해주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const passwordValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={passwordValues}
      render={props => (
        <PasswordForm {...props} closePasswordForm={closePasswordForm} />
      )}
      onSubmit={handleChangePassword}
      validationSchema={changePasswordValidation}
    />
  );
};

export default PasswordFormBox;
