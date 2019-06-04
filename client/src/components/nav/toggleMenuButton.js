/* eslint-disable no-console */
import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const ToggleMenuButton = ({ handleClose, open, anchorRef, toggleList }) => {
  console.log('Toggle Menu List is rendered.');
  return (
    <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper id="menu-list-grow">
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList>
                {toggleList.map(e => (
                  <MenuItem key={e.id} onClick={() => handleClose(e.to)}>
                    {e.name}
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

export default ToggleMenuButton;
