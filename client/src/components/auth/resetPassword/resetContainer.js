import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import PasswordForm from './passwordForm';

const ResetContainer = ({
  handleCloseModal,
  addFlashMessage,
  changePasswordByAdmin,
  closeSubModal,
  changePasswordByAdminValidation,
  clickedUserId,
}) => {
  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    const { companyName, newPassword } = values;
    try {
      await changePasswordByAdmin(clickedUserId, newPassword);
      await addFlashMessage(
        'success',
        `${companyName} 고객 비밀번호를 수정하였습니다.`,
      );
      await Promise.all([resetForm({}), closeSubModal(), handleCloseModal()]);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 계정 비밀번호 수정에 실패하였습니다. 비밀번호를 확인해주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const passwordValues = {
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={passwordValues}
      render={props => <PasswordForm {...props} />}
      onSubmit={handleChangePassword}
      validationSchema={changePasswordByAdminValidation}
    />
  );
};

export default ResetContainer;
