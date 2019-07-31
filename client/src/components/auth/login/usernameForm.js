import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';
import RadioButtonFormControl from '../../../shared/form/radioButtonFormControl';
import VerifyUserOptions from './verifyUserOptions';

const UsernameForm = ({ isSubmitting }) => (
  <React.Fragment>
    {/* <RadioButtonFormControl
      label="인증방법"
      icon=""
      formClassName="flex"
      formLabelClassName="radio-btn--verify-user"
      component={<VerifyUserOptions name="verifyUserType" />}
    /> */}
    <FormikField
      label="이메일"
      name="email"
      type="email"
      icon="email"
      styleName="textField"
      variant="outlined"
      placeholder="sleket12@hanmail.net"
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

export default UsernameForm;
