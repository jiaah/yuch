import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '../../assets/icons/catering';
import WarningIcon from '../../assets/icons/filledUser';
import ErrorIcon from '../../assets/icons/error';
import CheckCircleIcon from '../../assets/icons/clear';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const color = {
  success: '#43A047',
  warning: '#FFA000',
  error: '#ed4337',
  info: '#2196F3',
};

const styles = theme => ({
  success: {
    backgroundColor: theme.palette.success.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.info.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  container: {
    margin: theme.spacing.unit,
    borderRadius: '5px',
  },
  messageBox: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    opacity: 0.8,
    marginRight: '15px',
  },
});

const FlashMessage = ({ classes, variant, message }) => {
  const Icon = variantIcon[variant];
  const iconColor = color[variant];

  return (
    <SnackbarContent
      className={`${classes[variant]} ${classes.container}`}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.messageBox}>
          <div className={classes.icon}>
            <Icon
              name={Icon}
              width="27"
              height="21"
              viewBox="0 0 27 21"
              fill={iconColor}
            />
          </div>
          {message}
        </span>
      }
    />
  );
};

export default withStyles(styles)(FlashMessage);
