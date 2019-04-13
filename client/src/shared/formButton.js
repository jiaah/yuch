import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: '10px 14px',
    paddingTop: '3px',
    paddingBottom: '0',
    fontSize: '14.5px',
    lineHeight: '28px',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '31px',
    },
  },
});

const formButton = ({
  typeValue,
  variantValue,
  buttonName,
  width,
  isSubmitting,
  classes,
}) => {
  const widthValue =
    width === 'big' ? '8em' : width === 'small' ? '5em' : '7em';
  return (
    <React.Fragment>
      <Button
        type={typeValue}
        variant={variantValue}
        color="secondary"
        size="small"
        style={{ width: widthValue }}
        className={classes.button}
        disabled={isSubmitting}
      >
        {buttonName}
      </Button>
    </React.Fragment>
  );
};
export default withStyles(styles)(formButton);
