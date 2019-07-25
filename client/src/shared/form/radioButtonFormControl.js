import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Icon from '../../../assets/icons';

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

const RadioButtonFormControl = ({
  label,
  icon,
  component,
  className,
  classes,
}) => (
  <div className={className}>
    <FormControl component="fieldset" required className={classes.formControl}>
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
      {component}
    </FormControl>
  </div>
);

export default withStyles(styles)(RadioButtonFormControl);
