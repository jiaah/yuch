import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import SearchBar from '../../../shared/searchBar/searchBarContainer';

const drawerWidth = 500;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflowY: 'scroll',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'scroll',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: 200,
    [theme.breakpoints.up('sm')]: {
      width: 220,
    },
    overflowX: 'hidden',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  listItemA: { width: 240 },
});

const DeliveryDrawer = ({
  classes: { drawer, drawerOpen, drawerClose, toolbar, listItemA },
  // actions
  getUsers,
}) => {
  const [unassignedUsers, setUnassignedUsers] = useState(null);
  const [open, setOpen] = React.useState(false);

  const fetchUsers = async () => {
    const res = await getUsers();
    return setUnassignedUsers(res.activeUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const hideText = open ? '' : 'dn';
  return (
    <Drawer
      variant="permanent"
      className={clsx(drawer, {
        [drawerOpen]: open,
        [drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [drawerOpen]: open,
          [drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <div className={toolbar}>
        {open ? (
          <IconButton
            name="arrowLeft"
            width="20"
            height="22"
            viewBox="0 0 30 30"
            handleClick={handleDrawerClose}
          />
        ) : (
          <IconButton
            name="arrowRight"
            width="20"
            height="22"
            viewBox="0 0 30 30"
            handleClick={handleDrawerOpen}
          />
        )}
      </div>
      <div className="flex flex-column-m items-center pb2">
        <p className="f-large pb2">고객사</p>
        <SearchBar
          size="small"
          data={unassignedUsers}
          searchingProp="companyName"
          handleSuggestionSelected={() => {}}
          handleResetSearch={() => {}}
        />
      </div>

      <Divider />
      <List>
        {unassignedUsers &&
          unassignedUsers.map(u => (
            <ListItem key={u.id}>
              <p className={`${listItemA} fw3 c-text2`}>{u.companyName}</p>
              <p className={`${hideText} c-text-grey`}>{u.address}</p>
            </ListItem>
          ))}
      </List>
    </Drawer>
  );
};

export default withStyles(styles)(DeliveryDrawer);
