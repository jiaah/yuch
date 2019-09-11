import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: '20px 14px',
    paddingTop: '2px',
    paddingBottom: '1px',
    fontSize: '14px',
    lineHeight: '28px',
    color: '#ffffff',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '31px',
    },
  },
});

export const FormButton = ({
  typeValue,
  variantValue,
  buttonName,
  width,
  isSubmitting,
  classes,
  className,
}) => {
  let widthValue = '';
  let paddingValue = '';
  if (width === 'extraBig') {
    widthValue = '250px';
    paddingValue = '5px';
  }
  if (width === 'big') {
    widthValue = '10em';
    paddingValue = '4px';
  }
  if (width === 'medium') {
    widthValue = '8em';
  }
  if (width === 'small') widthValue = '6em';

  const widthStyle = { width: widthValue, padding: paddingValue };
  return (
    <Button
      type={typeValue}
      variant={variantValue}
      color="primary"
      size="small"
      style={widthStyle}
      className={`${className} ${classes.button}`}
      disabled={isSubmitting}
    >
      {buttonName}
    </Button>
  );
};

export default withStyles(styles)(FormButton);
