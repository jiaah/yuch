import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: '10px 12px',
    width: '7em',
    paddingTop: '2px',
    paddingBottom: '2px',
    [theme.breakpoints.up('md')]: {},
  },
});

const Buttons = ({
  handleFirstButtonClick,
  handleSecondButtonClick,
  classes,
  firstButtonName,
  secondButtonName,
}) => (
  <React.Fragment>
    <Button
      onClick={ev => handleFirstButtonClick(ev)}
      variant="contained"
      color="secondary"
      className={classes.button}
    >
      {firstButtonName}
    </Button>
    <Button
      onClick={ev => handleSecondButtonClick(ev)}
      variant="outlined"
      color="secondary"
      className={classes.button}
    >
      {secondButtonName}
    </Button>
  </React.Fragment>
);

export default withStyles(styles)(Buttons);
