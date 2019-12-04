import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Icon from '../../../assets/icons';
import Loader from '../../components/loader';
import IconButton from '../form/iconButton';
/* --- Actions --- */
import * as selectedActions from '../../actions/selectedAction';

const AutoCompletePaper = Loader({
  loader: () =>
    import('./autoCompletePaper' /* webpackChunkName: 'AutoCompletePaper' */),
});

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '2px solid #ee91054a',
    width: '170px',
    [theme.breakpoints.up('sm')]: {
      width: '190px',
    },
    [theme.breakpoints.up('md')]: {
      width: '250px',
    },
  },
  searchS: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '2px solid #ee91054a',
    width: '170px',
    [theme.breakpoints.up('sm')]: {
      width: '220px',
    },
  },
  searchIcon: {
    width: '20px',
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
    marginLeft: '10px',
    [theme.breakpoints.up('sm')]: {
      width: '40px',
      marginLeft: '0',
    },
  },
  input: {
    marginLeft: '30px',
    marginTop: '4.5px',
  },
  closeIcon: {
    marginTop: '7px',
    [theme.breakpoints.up('sm')]: {
      marginTop: '4px',
    },
  },
});

const SearchBar = ({
  classes: { search, searchS, searchIcon, input, closeIcon },
  size,
  data,
  disabled,
  searchingProp,
  // for special_meal create modal
  isSecondSearchBar,
  // actions
  selectedActions: { saveSelectedItemValue, resetSelectedItemValue },
  // parent component func
  handleSuggestionSelected,
  handleResetSearch,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const open = Boolean(anchorEl);
  const width = size === 'small' ? searchS : search;

  const handleChange = ({ target: { value } }) => setInputValue(value);
  const getSuggestions = async wordToMatch => {
    const regex = await new RegExp(`^[${wordToMatch}]`, 'gi');
    const suggestion = await data
      .sort()
      .filter(u => u[searchingProp].match(regex));
    return setSuggestions(suggestion);
  };

  const handleOnKeyUp = e => {
    const value = e.target.value;
    // these conditions are to keep the popper open while user is typing
    if (!anchorEl || value.length === 0)
      setAnchorEl(anchorEl ? null : e.currentTarget);
    if (value.length > 0) getSuggestions(value);
  };

  const suggestionSelected = data => {
    Promise.all([
      setInputValue(data[searchingProp]), // display the selected value in search bar
      setAnchorEl(null), // close autocomplete popper
      setSuggestions([]), // reset autoComplete matching suggestions
      !isSecondSearchBar ? saveSelectedItemValue(data[searchingProp]) : null, // make the selected value accesible in a parents component via redux
    ]);
    return handleSuggestionSelected(data);
  };

  const resetSearch = () => {
    Promise.all([
      setAnchorEl(null),
      setInputValue(null),
      setSuggestions([]),
      !isSecondSearchBar ? resetSelectedItemValue() : null,
    ]);

    return handleResetSearch();
  };

  useEffect(
    () => () => {
      resetSearch();
    },
    [],
  );

  return (
    <React.Fragment>
      <div
        className={`flex flex-row-m ${width} search-box`}
        onKeyUp={handleOnKeyUp}
      >
        <div className={searchIcon}>
          <Icon
            name="search"
            width="20"
            height="20"
            viewBox="0 0 25 25"
            fill="none"
            fillOuter="#E8716F"
          />
        </div>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'Search' }}
          onChange={handleChange}
          value={inputValue || ''}
          className={input}
          disabled={!!disabled}
        />
        <div className={closeIcon}>
          <IconButton
            name="close"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            handleClick={resetSearch}
          />
        </div>
      </div>
      {open && (
        <AutoCompletePaper
          open={open}
          anchorEl={anchorEl}
          suggestions={suggestions}
          suggestionSelected={suggestionSelected}
          searchingProp={searchingProp}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  selectedActions: bindActionCreators(selectedActions, dispatch),
});

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(SearchBar);
