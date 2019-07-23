import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Field } from 'formik';
/* --- Components --- */
import Input from './input';
import Icon from '../../../assets/icons';

const FormikField = ({
  label,
  name,
  type,
  placeholder,
  icon,
  styleName,
  variant,
  required,
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
    margin="normal"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Icon
            name={icon}
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          />
        </InputAdornment>
      ),
    }}
  />
);

export default FormikField;
