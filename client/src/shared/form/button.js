import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: '10px 14px',
    paddingTop: '2px',
    paddingBottom: '1px',
    fontSize: '14px',
    lineHeight: '28px',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
      lineHeight: '31px',
    },
  },
});

const button = ({
  typeValue,
  handleButtonClick,
  variantValue,
  buttonName,
  width,
  classes,
  className,
  testId,
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
  if (width === 'medium') widthValue = '8em';
  if (width === 'small') widthValue = '6em';

  return (
    <Button
      data-testid={testId}
      type={typeValue}
      onClick={ev => handleButtonClick(ev)}
      variant={variantValue}
      color="primary"
      size="small"
      style={{ width: widthValue, padding: paddingValue }}
      className={`${className} ${classes.button}`}
    >
      {buttonName}
    </Button>
  );
};
export default withStyles(styles)(button);
