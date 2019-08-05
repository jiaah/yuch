import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import queryString from 'query-string';
/* --- Components --- */
import ResetPwForm from './resetPwForm';
import { resetPasswordValidation } from '../../formValidation';
/* --- Actions --- */
import { resetPasswordWithAccessToken } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

const ResetContainer = ({
  addFlashMessage,
  resetPasswordWithAccessToken,
  history,
}) => {
  const handleResetPassword = async (values, { setSubmitting, resetForm }) => {
    const parsed = queryString.parse(location.search);
    const token = parsed.token;
    const { newPassword } = values;

    const res = await resetPasswordWithAccessToken(token, newPassword);
    if (!res.error) {
      await addFlashMessage('success', `고객님의 비밀번호를 수정하였습니다.`);
      resetForm({});
      return history.push('/login');
    }
    addFlashMessage(
      'error',
      `유효하지 않는 링크입니다. 비밀번호 찾기를 처음부터 다시 해주세요.`,
    );
    return setSubmitting(false);
  };

  const passwordValues = {
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <div className="login-container">
      <h2>비밀번호 변경</h2>
      <Formik
        initialValues={passwordValues}
        render={props => (
          <Form>
            <ResetPwForm {...props} />
          </Form>
        )}
        onSubmit={handleResetPassword}
        validationSchema={resetPasswordValidation}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  resetPasswordWithAccessToken: (id, password, newPassword) =>
    dispatch(resetPasswordWithAccessToken(id, password, newPassword)),
});

export default connect(
  null,
  mapDispatchToProps,
)(ResetContainer);
