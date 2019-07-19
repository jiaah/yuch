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

const BusinessTypeForm = ({ businessType, classes, change }) => (
  <div className="user-form--bankaccount">
    <FormControl component="fieldset" required className={classes.formControl}>
      <div className="flex">
        <Icon
          name="bankAccount"
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
        />
        <FormLabel component="legend" className={classes.formLabel}>
          비지니스 타입
        </FormLabel>
      </div>
      <RadioGroup
        aria-label="businessType"
        name="businessType"
        value={businessType}
        onChange={e => change(e, 'businessType', false)}
      >
        <FormControlLabel
          key="1"
          value="catering"
          control={<Radio color="primary" />}
          label="catering"
          labelPlacement="end"
        />
        <FormControlLabel
          key="2"
          value="restaurant"
          control={<Radio color="primary" />}
          label="restaurant"
          labelPlacement="end"
        />
      </RadioGroup>
    </FormControl>
  </div>
);

export default withStyles(styles)(BusinessTypeForm);
