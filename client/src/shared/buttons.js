import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '6em',
    paddingTop: '5px',
    paddingBottom: '5px',
    [theme.breakpoints.up('md')]: {
      // fontSize: '1em',
    },
  },
  bigButton: {
    margin: theme.spacing.unit,
    width: '9em',
    paddingTop: '5px',
    paddingBottom: '5px',
    [theme.breakpoints.up('md')]: {
      fontSize: '1em',
    },
  },
});

const Buttons = ({
  handleClick,
  classes,
  variantValue,
  colorValue,
  classNameValue,
  name,
}) => {
  const buttonStyle =
    classNameValue === 'bigButton' ? classes.bigButton : classes.button;
  return (
    <Button
      onClick={ev => handleClick(ev)}
      variant={variantValue}
      color={colorValue}
      className={buttonStyle}
    >
      {name}
    </Button>
  );
};

export default withStyles(styles)(Buttons);
