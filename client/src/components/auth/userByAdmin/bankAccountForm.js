import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Icon from '../../../../assets/icons';

const styles = theme => ({
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 5,
    },
  },
  formLabel: {
    marginLeft: '8px',
  },
  formControlLabel: {
    [theme.breakpoints.up('md')]: {
      marginRight: '50px',
    },
  },
});

const BankAccountForm = ({ bankAccountId, bankAccount, classes, change }) => (
  <div className="user-form--bankaccount">
    <FormControl
      component="fieldset"
      required
      className={`${classes.formControl} flex flex-column-m`}
    >
      <div className="flex">
        <Icon
          name="bankAccount"
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
        />
        <FormLabel component="legend" className={classes.formLabel}>
          입금 계좌번호
        </FormLabel>
      </div>
      <RadioGroup
        aria-label="bankAccountId"
        name="bankAccountId"
        value={bankAccountId}
        onChange={e => change(e, 'bankAccountId', false)}
      >
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
      </RadioGroup>
    </FormControl>
  </div>
);

export default withStyles(styles)(BankAccountForm);
