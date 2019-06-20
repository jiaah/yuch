import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';

/* --- SVG Icon Components --- */
import Icon from '../../../assets/icons';

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
    marginRight: '10px',
    marginTop: '.5px',
  },
});

const FlashMessage = ({ classes, variant, message }) => {
  const iconColor = color[variant];

  return (
    <SnackbarContent
      className={`${classes[variant]} ${classes.container}`}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.messageBox}>
          <div className={classes.icon}>
            <Icon
              name={variant}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fillOuter="#ffffff"
              fillInner={iconColor}
            />
          </div>
          {message}
        </span>
      }
    />
  );
};

export default withStyles(styles)(FlashMessage);
