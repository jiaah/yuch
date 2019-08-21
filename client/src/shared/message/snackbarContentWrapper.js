import React from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Icon from '../../../assets/icons';
import IconButton from '../form/iconButton';

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
    margin: theme.spacing(1),
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

const SnackbarContentWrapper = ({ classes, message, variant, onClose }) => {
  const iconColor = color[variant];
  return (
    <SnackbarContent
      className={`${classes[variant]} ${classes.container}`}
      aria-describedby="client-msg"
      message={
        <span id="client-msg" className={classes.messageBox}>
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
      action={[
        <IconButton
          key="close"
          name="close"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          color="white"
          handleClick={onClose}
        />,
      ]}
    />
  );
};

export default withStyles(styles)(SnackbarContentWrapper);
