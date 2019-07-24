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

const RadioButtons = ({ label, name, id, rows, icon, classes }) => {
  const change = (e, name) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (name === 'bankAccountId' || name === 'businessType') {
      value = inputValue;
    }
    return setFieldValue(name, value, shouldValidate);
  };
  return (
    <div className="user-form--radioBtn">
      <FormControl
        component="fieldset"
        required
        className={`${classes.formControl} flex flex-column-m`}
      >
        <div className="flex">
          <Icon
            name={icon}
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
          />
          <FormLabel component="legend" className={classes.formLabel}>
            {label}
          </FormLabel>
        </div>
        <RadioGroup
          aria-label={name}
          name={name}
          value={id}
          onChange={e => change(e)}
          row
        >
          {rows.length !== 0 &&
            rows.map(row => {
              const label = `${row.accountHolder} ${row.bankName} ${
                row.accountNo
              }`;
              return (
                <FormControlLabel
                  key={row.id}
                  value={row.id}
                  control={<Radio color="primary" />}
                  label={label}
                  labelPlacement="end"
                />
              );
            })}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default withStyles(styles)(RadioButtons);
