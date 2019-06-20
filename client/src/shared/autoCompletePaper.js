import React from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

const AutoCompletePaper = ({ anchorEl }) => {
  const open = Boolean(anchorEl);

  return (
    <Popper id="simple-popper" open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            className="pa3 mt1 f-mini"
            style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
          >
            The content of the Popper.
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default AutoCompletePaper;
