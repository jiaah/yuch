import React, { useState } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Field } from 'formik';
/* --- Components --- */
import Input from './input';
import IconButton from './iconButton';
import Icon from '../../../assets/icons';

const PasswordField = ({ label, name, styleName, placeholder, variant }) => {
  // hide & show password
  const [visible, setVisible] = useState(false);
  const handleClickShowPassword = () => setVisible(!visible);
  const type = visible ? 'text' : 'password';
  const visibleIcon = visible ? 'visibility' : 'visibilityOff';

  return (
    <Field
      label={label}
      name={name}
      component={Input}
      styleName={styleName}
      placeholder={placeholder}
      type={type}
      required={true}
      variant={variant}
      margin="normal"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              name="filledLock"
              width="28"
              height="28"
              viewBox="0 0 30 30"
              fill="none"
            />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Toggle password visibility"
              name={visibleIcon}
              width="20"
              height="20"
              viewBox="0 0 25 25"
              handleClick={handleClickShowPassword}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
