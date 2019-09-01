import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Field } from 'formik';
/* --- Components --- */
import RadioButtonGroup from '../../../shared/form/radioButtonGroup';

const BankAccountOptions = ({ name, bankAccount }) => (
  <Field aria-label={name} name={name} component={RadioButtonGroup}>
    {bankAccount.length !== 0 &&
      bankAccount.map(row => (
        <FormControlLabel
          key={row.id}
          value={row.id}
          control={<Radio color="primary" />}
          label={`${row.accountHolder} ${row.bankName} ${row.accountNo}`}
          labelPlacement="end"
        />
      ))}
  </Field>
);

export default BankAccountOptions;
