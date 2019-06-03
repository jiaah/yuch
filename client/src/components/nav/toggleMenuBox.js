import React from 'react';
import { withStyles } from '@material-ui/core/styles';

/* --- Components --- */
import ToggleMenuList from './toggleMenuList';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});

const ToggleMenuBox = ({ links, classes }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };
  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <ToggleMenuList
      classes={classes}
      handleToggle={handleToggle}
      handleClose={handleClose}
      open={open}
      anchorRef={anchorRef}
      links={links}
    />
  );
};

export default withStyles(styles)(ToggleMenuBox);
