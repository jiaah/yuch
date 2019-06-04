/* eslint-disable no-console */
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import ToggleMenuButton from './toggleMenuButton';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

const ToggleMenuBox = ({
  props,
  data: { navAdmin, navAdminListA },
  classes,
}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = (event, { route }) => {
    console.log('route: ', route);
    console.log('anchorRef.current: ', anchorRef.current);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      console.log('target is clicked!');
      return props.history.push(route);
    }
    setOpen(false);
  };
  console.log('Toggle Menu Box is rendered');
  return (
    <React.Fragment>
      <div className={`nav-menu ${classes.root}`}>
        {navAdmin.map(e => (
          <Button
            key={e.id}
            ref={anchorRef}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            className={e.className}
          >
            {e.name}
          </Button>
        ))}
      </div>
      <ToggleMenuButton
        handleClose={handleClose}
        open={open}
        anchorRef={anchorRef}
        toggleList={navAdminListA}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(ToggleMenuBox);
