import React from 'react';
import { Field } from 'formik';
/* --- Components --- */
import Input from './input';

const FormikField = ({
  label,
  name,
  type,
  placeholder,
  icon,
  styleName,
  variant,
  required,
  disabled,
}) => (
  <Field
    label={label}
    name={name}
    type={type}
    component={Input}
    placeholder={placeholder}
    styleName={styleName}
    variant={variant}
    icon={icon}
    required={!!required}
    disabled={!!disabled}
    margin="normal"
  />
);

export default FormikField;
