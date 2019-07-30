import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field } from 'formik';
/* --- Components --- */
import RadioButtonGroup from '../../../shared/form/radioButtonGroup';

const VerifyUserOptions = ({ name }) => (
  <Field aria-label={name} name={name} component={RadioButtonGroup}>
    <FormControlLabel
      value="email"
      control={<Radio color="primary" />}
      label="이메일"
      labelPlacement="end"
    />
    <FormControlLabel
      value="contactNo"
      control={<Radio color="primary" />}
      label="휴대폰번호"
      labelPlacement="end"
    />
  </Field>
);

export default VerifyUserOptions;
