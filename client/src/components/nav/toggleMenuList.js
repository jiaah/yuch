/* eslint-disable no-console */
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Loader from '../loader';

const ToggleMenuItems = Loader({
  loader: () =>
    import('./toggleMenuItems' /* webpackChunkName: 'ToggleMenuItems' */),
});

const styles = () => ({
  root: {
    display: 'flex',
  },
});

const ToggleMenuList = ({ navAdminList, navAdminItems, classes }) => {
  const [activeId, setActiveId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (ev, id) => {
    setActiveId(id);
    setAnchorEl(ev.currentTarget);
  };
  const handleClose = () => {
    setActiveId(null);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <div className={`nav-menu--admin ${classes.root}`}>
        {navAdminList.map(e => (
          <div key={e.id}>
            <Button
              aria-owns={activeId === e.id ? 'menu-list-grow' : undefined}
              aria-haspopup={activeId === e.id ? 'true' : 'false'}
              onClick={ev => handleClick(ev, e.id)}
              className="nav-menu--btn"
            >
              {e.name}
            </Button>
            {activeId === e.id && (
              <ToggleMenuItems
                activeId={activeId}
                anchorEl={anchorEl}
                handleClose={handleClose}
                items={navAdminItems[e.id]}
              />
            )}
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(ToggleMenuList);
