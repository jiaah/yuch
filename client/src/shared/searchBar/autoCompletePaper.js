import React from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
/* --- Components --- */
import SuggestionsList from './suggestionsList';

const AutoCompletePaper = ({ anchorEl, suggestions, suggestionSelected }) => {
  const open = Boolean(anchorEl);

  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <SuggestionsList
        suggestions={suggestions}
        suggestionSelected={suggestionSelected}
      />
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
