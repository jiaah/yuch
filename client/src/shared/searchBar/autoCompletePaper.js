import React from 'react';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import SuggestionsList from './suggestionsList';

const styles = () => ({ popper: { zIndex: 100000000 } });

const AutoCompletePaper = ({
  classes: { popper },
  open,
  anchorEl,
  suggestions,
  suggestionSelected,
  searchingProp,
}) => {
  const renderSuggestions = () => {
    if (suggestions.length === 0) {
      return <p className="f-mini pa3">일치하는 검색결과가 없습니다&#46;</p>;
    }
    return (
      <SuggestionsList
        suggestions={suggestions}
        suggestionSelected={suggestionSelected}
        searchingProp={searchingProp}
      />
    );
  };

  return (
    <Popper
      id="simple-popper"
      open={open}
      anchorEl={anchorEl}
      transition
      className={popper}
    >
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

export default withStyles(styles)(AutoCompletePaper);
