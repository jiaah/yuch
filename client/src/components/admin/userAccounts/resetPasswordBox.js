import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import ResetPwForm from '../../auth/password/resetPwForm';
// don't use auth/password/resetPwContainer as it calls a different action function(which access token is not required) and it also has 'closeSubModal' function.

const ResetPasswordBox = ({
  handleCloseModal,
  addFlashMessage,
  resetPassword,
  closeSubModal,
  resetPasswordValidation,
  clickedUserId,
}) => {
  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    const { companyName, newPassword } = values;
    try {
      await resetPassword(clickedUserId, newPassword);
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
      render={props => (
        <Form>
          <ResetPwForm {...props} />
        </Form>
      )}
      onSubmit={handleChangePassword}
      validationSchema={resetPasswordValidation}
    />
  );
};

export default ResetPasswordBox;
