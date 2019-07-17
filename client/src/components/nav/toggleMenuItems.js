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
  const leftSideMenu = activeId === 4 ? 'rightSideMenu' : '';

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
          className={`toggle-menu ${leftSideMenu}`}
        >
          <Paper id="menu-list-grow">
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList className="toggle-menu--list">
                {items.map(e => (
                  <Link
                    replace
                    key={e.id}
                    to={e.to}
                    className="anchor td-none c-text1"
                  >
                    <MenuItem
                      className="toggle-menu--item"
                      onClick={handleClose}
                    >
                      <div className="pw1">{e.name}</div>
                    </MenuItem>
                  </Link>
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
