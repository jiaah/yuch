import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: '18px 12px 0 12px',
    width: '7em',
    paddingTop: '0',
    paddingBottom: '0',
    [theme.breakpoints.up('md')]: {},
  },
});

const SingleButton = ({
  handleButtonClick,
  classes,
  variantType,
  buttonName,
}) => (
  <React.Fragment>
    <Button
      onClick={ev => handleButtonClick(ev)}
      variant={variantType}
      color="secondary"
      className={`firstBtn ${classes.button}`}
    >
      {buttonName}
    </Button>
  </React.Fragment>
);

export default withStyles(styles)(SingleButton);
