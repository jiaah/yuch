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
});

const Buttons = ({ loginbtn, handleClick, classes }) => (
  <div>
    {loginbtn &&
      loginbtn.map(e => (
        <Button
          key={e.key}
          onClick={ev => handleClick(ev)}
          variant={e.variant}
          color={e.color}
          className={classes.button}
        >
          {e.name}
        </Button>
      ))}
  </div>
);

export default withStyles(styles)(Buttons);
