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
}) => {
  const widthValue =
    width === 'big' ? '8em' : width === 'small' ? '5em' : '7em';
  return (
    <Button
      data-testid="button"
      type={typeValue}
      onClick={ev => handleButtonClick(ev)}
      variant={variantValue}
      color="primary"
      size="small"
      style={{ width: widthValue }}
      className={`${className} ${classes.button}`}
    >
      {buttonName}
    </Button>
  );
};
export default withStyles(styles)(button);
