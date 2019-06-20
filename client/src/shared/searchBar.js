import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Icon from '../../assets/icons';

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
    width: '30px',
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
    padding: '1px 1px 1px 25px',
    transition: theme.transitions.create('width'),
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      padding: '1px 1px 1px 20px',
    },
  },
});

const SearchBar = ({ classes: { search, searchIcon, inputInput } }) => (
  <div className={search}>
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
      className={inputInput}
      inputProps={{ 'aria-label': 'Search' }}
    />
  </div>
);

export default withStyles(styles)(SearchBar);
