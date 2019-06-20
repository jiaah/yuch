import React, { useState } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Icon from '../../../assets/icons';
import Loader from '../loader';
/* --- Actions --- */
import { addSelectedItem } from '../../actions/selectedItemAction';

const AutoCompletePaper = Loader({
  loader: () =>
    import('./autoCompletePaper' /* webpackChunkName: 'AutoCompletePaper' */),
});

const styles = theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '2px solid #ee91054a',
    width: '160px',
    [theme.breakpoints.up('sm')]: {
      width: '250px',
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
    [theme.breakpoints.up('sm')]: {
      width: '40px',
    },
  },
  inputInput: {
    padding: '1px 0 1px 0',
    transition: theme.transitions.create('width'),
    width: '100%',
  },
});

const SearchBar = ({
  classes: { search, searchIcon, inputInput },
  users,
  addSelectedItem,
}) => {
  const [inputValue, setInputValue] = useState(inputValue);
  const [anchorEl, setAnchorEl] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = ({ target: { value } }) => setInputValue(value);

  const getSuggestions = async wordToMatch => {
    const regex = await new RegExp(`^${wordToMatch}`, 'gi');
    const suggestions = await users
      .sort()
      .filter(u => u.companyName.match(regex) || u.username.match(regex));

    return setSuggestions(suggestions);
  };

  const handleOnKeyUp = e => {
    const value = e.target.value;
    // these conditions are to keep the popper open while user is typing
    if (!anchorEl || value.length === 0)
      setAnchorEl(anchorEl ? null : e.currentTarget);
    if (value.length > 0) getSuggestions(value);
  };

  const suggestionSelected = value => {
    setInputValue(value);
    setAnchorEl(null);
    setSuggestions([]);
    return addSelectedItem(value);
  };

  const open = Boolean(anchorEl);

  return (
    <React.Fragment>
      <div className={search} onKeyUp={handleOnKeyUp}>
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
          className={{ input: inputInput }}
          inputProps={{ 'aria-label': 'Search' }}
          onChange={handleChange}
          value={inputValue || ''}
        />
      </div>
      {open && (
        <AutoCompletePaper
          open={open}
          anchorEl={anchorEl}
          suggestions={suggestions}
          suggestionSelected={suggestionSelected}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => ({
  addSelectedItem: value => dispatch(addSelectedItem(value)),
});

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps,
  ),
)(SearchBar);
