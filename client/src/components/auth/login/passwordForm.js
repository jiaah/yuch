import React from 'react';
import { Form } from 'formik';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const PasswordForm = ({ isSubmitting }) => (
  <Form className="flex flex-column-m items-center mt4">
    <FormikField
      label="아이디"
      name="username"
      type="text"
      icon="filledUser"
      styleName="textField"
      placeholder="( 아이디 ) yucheong"
      required
    />
    <FormikField
      label="이메일"
      name="email"
      type="email"
      icon="email"
      styleName="textField"
      variant="outlined"
      placeholder="sleket12@hanmail.net"
      required
    />
    <div className="forgot--password-box--btn">
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="계속하기"
        className="login-btn"
        isSubmitting={isSubmitting}
      />
    </div>
  </Form>
);

export default PasswordForm;
