import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import * as data from '../../shared/data';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: '6em',
    paddingTop: '5px',
    paddingBottom: '5px',
  },
});

const ReserveResolvedText = ({ apiRequest, handleClose, classes }) => (
  <React.Fragment>
    {apiRequest === 'success' ? (
      <p>{data.reserveSuccessMessage}</p>
    ) : apiRequest === 'error' ? (
      <p>
        {data.reserveErrorMessage} <br />
        <br />
        <span className="b">상담전화 054-745-0999</span>
      </p>
    ) : null}
    <div className="mt2">
      <Button
        onClick={handleClose}
        variant="outlined"
        color="secondary"
        className={classes.button}
      >
        닫기
      </Button>
    </div>
  </React.Fragment>
);

export default withStyles(styles)(ReserveResolvedText);
