import React from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
/* --- Components --- */
import SuggestionsList from './suggestionsList';

const AutoCompletePaper = ({
  open,
  anchorEl,
  suggestions,
  suggestionSelected,
}) => {
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return <p className="f-mini pa3">일치하는 검색결과가 없습니다&#46;</p>;
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
            className="mt1 f-mini"
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
