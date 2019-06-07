/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import Loader from '../../shared/loader';

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
  const anchorRef = useRef(null);
  const handleToggle = id => setActiveId(id);
  const handleClose = () => setActiveId(null);

  return (
    <React.Fragment>
      <div className={`nav-menu--admin ${classes.root}`}>
        {navAdminList.map(e => (
          <div key={e.id}>
            <Button
              ref={anchorRef}
              aria-owns={activeId === e.id ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={() => handleToggle(e.id)}
              className="nav-menu--btn"
            >
              {e.name}
            </Button>
            {activeId === e.id && (
              <ToggleMenuItems
                listId={e.id}
                activeId={activeId}
                handleClose={handleClose}
                anchorRef={anchorRef}
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
