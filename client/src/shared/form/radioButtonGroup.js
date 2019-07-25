import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

const RadioButtonGroup = ({ field, ...props }) => (
  <React.Fragment>
    <RadioGroup {...field} {...props} row />
  </React.Fragment>
);

export default RadioButtonGroup;
