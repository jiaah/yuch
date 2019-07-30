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
  if (width === 'big') widthValue = '8em';
  if (width === 'medium') widthValue = '7em';
  if (width === 'small') widthValue = '5em';

  const widthStyle = { width: widthValue };
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
