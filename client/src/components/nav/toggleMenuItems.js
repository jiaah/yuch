import React from 'react';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const ToggleMenuItems = ({
  listId,
  activeId,
  handleClose,
  anchorRef,
  items,
}) => {
  const isOpen = activeId === listId;

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
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
          className="toggle-menu"
        >
          <Paper id="menu-list-grow">
            <ClickAwayListener onClickAway={ev => handleClose(ev)}>
              <MenuList>
                {items.map(e => (
                  <MenuItem key={e.id} onClick={ev => handleClose(ev)}>
                    <Link
                      to={e.to}
                      className="anchor td-none c-text1 toggle-menu--link"
                    >
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
