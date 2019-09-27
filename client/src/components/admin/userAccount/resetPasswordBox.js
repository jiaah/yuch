import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import ResetPwForm from '../../auth/password/resetPwForm';
// don't use auth/password/resetPwContainer as it calls a different action function(which access token is not required) and it also has 'closeSubModal' function.

const ResetPasswordBox = ({
  handleCloseModal,
  closeSubModal,
  addFlashMessage,
  resetPassword,
  resetPasswordValidation,
  clickedUserData,
}) => {
  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    const { companyName, id } = clickedUserData;
    const { newPassword } = values;

    const res = await resetPassword(id, newPassword);
    if (!res.error) {
      addFlashMessage(
        'success',
        `${companyName} 고객 비밀번호를 수정하였습니다.`,
      );
      Promise.all([
        setSubmitting(false),
        resetForm({}),
        closeSubModal(),
        handleCloseModal(),
      ]);
    } else {
      addFlashMessage(
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
