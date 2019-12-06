import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const ToggleMenuItems = ({
  id,
  anchorEl,
  items,
  handleClose,
  handlePrint,
  handleDelete,
}) => (
  <Popper
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    keepMounted
    transition
    disablePortal
    className="delivery-toggle"
  >
    {({ TransitionProps }) => (
      <Grow
        {...TransitionProps}
        style={{
          transformOrigin: { vertical: 'top', horizontal: 'left' },
        }}
        className="toggle-menu"
      >
        <Paper id="menu-list-grow">
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList className="toggle-menu--list">
              <MenuItem
                key={items[0].id}
                className="toggle-menu--item"
                onClick={() => handlePrint(id)}
              >
                <div className="pw1">{items[0].name}</div>
              </MenuItem>
              <MenuItem
                key={items[1].id}
                className="toggle-menu--item"
                onClick={() => handleDelete(id)}
              >
                <div className="pw1">{items[1].name}</div>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Grow>
    )}
  </Popper>
);

export default ToggleMenuItems;
