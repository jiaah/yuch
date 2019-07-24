import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Field } from 'formik';
/* --- Components --- */
import Input from './input';

const MealPriceField = ({
  label,
  name,
  type,
  placeholder,
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
    required={!!required}
    disabled={!!disabled}
    margin="normal"
    InputProps={{
      startAdornment: <InputAdornment position="start">₩</InputAdornment>,
    }}
  />
);

export default MealPriceField;
