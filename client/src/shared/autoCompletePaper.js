import React from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

const AutoCompletePaper = ({ anchorEl, suggestions }) => {
  const open = Boolean(anchorEl);

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(u => (
          <li key={u.id}>{u.companyName}</li>
        ))}
      </ul>
    );
  };

  return (
    <Popper id="simple-popper" open={open} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper
            className="pa3 mt1 f-mini"
            style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}
          >
            {renderSuggestions()}
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default AutoCompletePaper;
