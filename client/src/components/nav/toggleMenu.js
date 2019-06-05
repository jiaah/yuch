/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
/* --- Components --- */
// import Loader from '../../shared/loader';

// const ToggleMenuItems = Loader({
//   loader: () =>
//     import('./toggleMenuItems' /* webpackChunkName: 'ToggleMenuItems' */),
// });

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

const ToggleMenuList = ({ navAdminList, navAdminItems, classes }) => {
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      console.log('target is clicked!');
      return;
    }
    setOpen(false);
  };

  return (
    <div className={`nav-menu ${classes.root}`}>
      <Button
        ref={anchorRef}
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        식수현황
      </Button>
      <Popper
        open={`open${id}`}
        anchorEl={anchorRef.current}
        keepMounted
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              width: '230px',
              paddingTop: '.3em',
              paddingBottom: '.3em',
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {items.map(e => (
                    <MenuItem key={e.id} onClick={handleClose}>
                      <Link to={e.to} className={e.className}>
                        {e.name}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default withStyles(styles)(ToggleMenuList);
