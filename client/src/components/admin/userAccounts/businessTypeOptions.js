import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field } from 'formik';
/* --- Components --- */
import RadioButtonGroup from '../../../shared/form/radioButtonGroup';

const BusinessTypeOptions = ({ name, value }) => (
  <Field
    aria-label={name}
    name={name}
    value={value}
    component={RadioButtonGroup}
  >
    <FormControlLabel
      value="catering"
      control={<Radio color="primary" />}
      label="위탁급식"
      labelPlacement="end"
    />
    <FormControlLabel
      value="restaurant"
      control={<Radio color="primary" />}
      label="식당"
      labelPlacement="end"
    />
  </Field>
);

export default BusinessTypeOptions;
