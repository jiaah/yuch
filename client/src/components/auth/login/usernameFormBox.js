import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import UsernameForm from './usernameForm';

const usernameFormBox = ({
  companyName,
  findUsername,
  addFlashMessage,
  forgotUsernameValidation,
  saveUsername,
}) => {
  const handleForgotUsername = async (values, { setSubmitting, resetForm }) => {
    const { email } = values;
    try {
      const username = await findUsername(email);
      setSubmitting();
      resetForm({});
      return saveUsername(username, email);
    } catch (err) {
      await addFlashMessage(
        'error',
        `${email}은 유청에 등록되어 있는 이메일이 아닙니다. 이메일 주소를 확인해주세요.`,
      );
      return setSubmitting();
    }
  };

  const usernameValues = {
    email: '',
  };

  return (
    <div className="flex flex-column-m items-center">
      <p className="mb2 b f-regular lh-2">
        {companyName}에 등록되어 있는 이메일 주소를 입력해 주세요.
      </p>
      <p className="c-text-grey f-mini">
        이메일 주소를 등록하지 않았거나, 기억이 나지 않으시면&#8201;
        {companyName}
        으로 문의 바랍니다.
      </p>
      <Formik
        initialValues={usernameValues}
        render={props => <UsernameForm {...props} />}
        onSubmit={handleForgotUsername}
        validationSchema={forgotUsernameValidation}
      />
    </div>
  );
};

export default usernameFormBox;
