import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

const RadioButtonGroup = ({ field: { onChange, name, ...rest }, ...props }) => {
  const { setFieldValue } = props.form;

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    return setFieldValue(name, inputValue, shouldValidate);
  };
  return (
    <RadioGroup
      onChange={e => change(e, name, true)}
      {...rest}
      {...props}
      row
    />
  );
};

export default RadioButtonGroup;
