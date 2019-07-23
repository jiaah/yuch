import React from 'react';
import { Form } from 'formik';

/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const UsernameForm = ({ isSubmitting }) => (
  <Form className="flex flex-column-m items-center mt4">
    <FormikField
      label="이메일"
      name="email"
      type="email"
      icon="email"
      styleName="textField"
      placeholder="sleket12@hanmail.net"
      variant="outlined"
      required
    />
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="계속하기"
      className="login-btn"
      isSubmitting={isSubmitting}
    />
  </Form>
);

export default UsernameForm;
