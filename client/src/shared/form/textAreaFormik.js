import React from 'react';
import { Field } from 'formik';
/* --- Components --- */
import TextArea from './textArea';

const FormikField = ({
  name,
  type,
  placeholder,
  styleName,
  required,
  disabled,
  rows,
}) => (
  <Field
    name={name}
    type={type}
    component={TextArea}
    placeholder={placeholder}
    styleName={styleName}
    required={!!required}
    disabled={!!disabled}
    rows={rows}
    margin="normal"
  />
);

export default FormikField;
