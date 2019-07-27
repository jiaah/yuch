import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const PasswordForm = ({ isSubmitting }) => (
  <React.Fragment>
    <FormikField
      label="아이디"
      name="username"
      type="text"
      icon="filledUser"
      styleName="textField"
      variant="outlined"
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
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="계속하기"
      className="login-btn"
      isSubmitting={isSubmitting}
    />
  </React.Fragment>
);

export default PasswordForm;
