import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Field } from 'formik';
/* --- Components --- */
import Input from './input';
import Icon from '../../../assets/icons';

const TimeField = ({ styleName, variant, required, disabled }) => (
  <Field
    label="시간"
    name="time"
    type="time"
    component={Input}
    styleName={styleName}
    variant={variant}
    required={!!required}
    disabled={!!disabled}
    margin="normal"
    InputProps={{
      step: 900,
      startAdornment: (
        <InputAdornment position="start">
          <Icon
            name="time"
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

export default TimeField;
