import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

const RadioButtonGroup = ({ field, ...props }) => (
  <RadioGroup {...field} {...props} row />
);

export default RadioButtonGroup;
