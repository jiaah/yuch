import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';

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
  field: { onChange, name, ...rest },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    return setFieldValue(name, inputValue, shouldValidate);
  };

  return (
    <React.Fragment>
      <RadioGroup
        id="radioGroup"
        onChange={e => change(e, name, true)}
        {...rest}
        {...props}
        row
      />
      <p style={styles}>{touched[name] && errors[name]}</p>
    </React.Fragment>
  );
};

export default RadioButtonGroup;
