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
});

const RadioButtonFormControl = ({
  label,
  icon,
  component,
  formClassName,
  formLabelClassName,
  classes: { formControl, formLabel },
  required,
}) => (
  <FormControl
    component="fieldset"
    required={!!required}
    className={formControl}
  >
    <div className={formClassName}>
      <div className={`flex ${formLabelClassName}`}>
        <Icon
          name={icon}
          width="20"
          height="20"
          viewBox="0 0 25 25"
          fill="none"
        />
        <FormLabel component="legend" className={formLabel}>
          {label}
        </FormLabel>
      </div>
      {component}
    </div>
  </FormControl>
);

export default withStyles(styles)(RadioButtonFormControl);
