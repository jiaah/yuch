import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import { getIn } from 'formik';

const styles = {
  color: '#ed4337',
  fontSize: '12px',
  margin: 0,
  minHeight: '1em',
  textAlign: 'left',
  fontWeight: '400',
  lineHeight: '1em',
  letterSpacing: '0.03333em',
};

const RadioButtonGroup = ({
  field: { onChange, name, value, ...rest },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const errorMessage = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    return setFieldValue(name, inputValue, shouldValidate);
  };

  return (
    <React.Fragment>
      <RadioGroup
        id="radioGroup"
        value={value || ''}
        onChange={e => change(e, name, true)}
        {...rest}
        {...props}
        row
      />
      <p style={styles}>{isTouched && errorMessage}</p>
    </React.Fragment>
  );
};

export default RadioButtonGroup;
