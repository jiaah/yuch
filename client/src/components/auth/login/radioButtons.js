import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const RadioButtons = ({ selectedValue, handleSelectRadioButton }) => (
  <RadioGroup
    aria-label="VerifyUserOptions"
    name="contactNo"
    value={selectedValue}
    onChange={handleSelectRadioButton}
    className="ph"
    row
  >
    <FormControlLabel
      value="contactNo"
      control={<Radio color="primary" />}
      label="휴대폰번호"
      labelPlacement="end"
    />
    <FormControlLabel
      value="email"
      control={<Radio color="primary" />}
      label="이메일"
      labelPlacement="end"
    />
  </RadioGroup>
);

export default RadioButtons;
