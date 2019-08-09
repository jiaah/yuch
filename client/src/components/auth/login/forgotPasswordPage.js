import React, { useState } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import PasswordForm from './passwordForm';

const ForgotPasswordPage = ({
  companyName,
  forgotPasswordValidation,
  sendVerificationCodeToEmail,
  addFlashMessage,
}) => {
  const [state, setState] = useState({ emailSent: false, email: '' });

  const handleForgotPassword = async (values, { setSubmitting, resetForm }) => {
    const { username, email } = values;

    const res = await sendVerificationCodeToEmail(username, email);
    if (!res.error) {
      await setState({ emailSent: true, email });
      resetForm({});
    } else {
      addFlashMessage(
        'error',
        `${email}로 이메일을 보내는데 실패하였습니다. 아이디와 이메일 주소가 맞는지 확인해주세요.`,
      );
    }
    return setSubmitting();
  };

  const passwordValues = {
    username: '',
    email: '',
  };

  return (
    <div className="tc">
      <p className="mb2 b f-regular lh-2">
        고객님의 아이디와 {companyName}에 등록되어 있는 이메일 주소를 입력해
        주세요.
      </p>
      <p className="c-text-grey f-mini">
        고객님이 입력한 이메일로 인증코드가 전송됩니다.
      </p>
      <p className="c-text-grey f-mini">
        비밀번호를 찾는데 어려움이 있으면&#8201;
        {companyName}
        으로 문의 바랍니다.
      </p>
      <Formik
        initialValues={passwordValues}
        render={props => (
          <Form className="flex flex-column-m items-center mt4">
            <PasswordForm {...props} />
          </Form>
        )}
        onSubmit={handleForgotPassword}
        validationSchema={forgotPasswordValidation}
      />
      {state.emailSent && (
        <p className="mt4 f-regular lh-2">
          <span className="b">{state.email}</span> &#8201;로 인증코드가
          성공적으로 전송되었습니다. <br />
          <span className="c-point2">이메일을 확인해주세요.</span>
        </p>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
