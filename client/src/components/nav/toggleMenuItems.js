import React from 'react';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const ToggleMenuItems = ({ id, activeId, handleClose, anchorRef, items }) => {
  const isOpen = activeId === id;

  return (
    <Popper
      open={isOpen}
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
            <ClickAwayListener onClickAway={() => handleClose(id)}>
              <MenuList>
                {items.map(e => (
                  <MenuItem key={e.id} onClick={() => handleClose(id)}>
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
  );
};

export default ToggleMenuItems;
