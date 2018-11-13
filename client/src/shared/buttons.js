import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '6em',
    paddingTop: '5px',
    paddingBottom: '5px',
    [theme.breakpoints.up('md')]: {},
  },
});

const Buttons = ({ handleClick, classes, variantValue, colorValue, name }) => (
  <Button
    onClick={ev => handleClick(ev)}
    variant={variantValue}
    color={colorValue}
    className={classes.button}
  >
    {name}
  </Button>
);

export default withStyles(styles)(Buttons);
