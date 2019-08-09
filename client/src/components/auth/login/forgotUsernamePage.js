import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import UsernameForm from './usernameForm';

const ForgotUsernamePage = ({
  companyName,
  findUsernameWithEmail,
  findUsernameWithContact,
  addFlashMessage,
  forgotUsernameValidation,
  saveUsername,
  selectedValue,
  handleSelectRadioButton,
}) => {
  const handleApiRequest = async values => {
    let res;
    const { email, contactNo } = values;
    if (selectedValue === 'email') {
      res = await findUsernameWithEmail(email);
    }
    if (selectedValue === 'contactNo') {
      res = await findUsernameWithContact(contactNo);
    }
    return res;
  };
  const handleForgotUsername = async (values, { setSubmitting, resetForm }) => {
    const res = await handleApiRequest(values);
    if (!res.error) {
      const { companyName, username } = res;
      await saveUsername(companyName, username, values);
      resetForm({});
    } else {
      addFlashMessage(
        'error',
        `유청에 등록되어 있는 정보가 아닙니다. 다시 한번 확인해주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const usernameValues = {
    email: '',
    contactNo: '',
  };

  return (
    <div className="tc">
      <p className="mb2 b f-regular lh-2">
        {companyName}에 등록되어 있는 이메일주소 혹은 연락처를 입력해 주세요.
      </p>
      <p className="c-text-grey f-mini mb3">
        이메일주소 혹은 연락처를 등록하지 않았거나, 기억이 나지 않으면&#8201;
        {companyName}
        으로 문의 바랍니다.
      </p>
      <Formik
        initialValues={usernameValues}
        render={props => (
          <Form className="flex flex-column-m items-center mt4">
            <UsernameForm
              {...props}
              selectedValue={selectedValue}
              handleSelectRadioButton={handleSelectRadioButton}
            />
          </Form>
        )}
        onSubmit={handleForgotUsername}
        validationSchema={forgotUsernameValidation}
      />
    </div>
  );
};

export default ForgotUsernamePage;
