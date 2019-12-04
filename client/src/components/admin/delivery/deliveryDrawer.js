import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
/* --- Components --- */
import { styles } from './deliveryStyles';
import IconButton from '../../../shared/form/iconButton';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import DeliveryDrawerBoard from './deliveryDrawerBoard';

const DeliveryDrawer = ({
  classes: { paper, drawer, drawerOpen, drawerClose, toolbar },
  // global state
  selectedSearchItem,
  // actions
  getUsers,
}) => {
  const [usersList, setUsersList] = useState(null);
  const [open, setOpen] = React.useState(false);

  const fetchUsers = async () => {
    const res = await getUsers();
    return setUsersList(res.activeUsers);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Drawer
      variant="permanent"
      className={clsx(drawer, {
        [drawerOpen]: open,
        [drawerClose]: !open,
      })}
      classes={{
        paper: clsx(
          {
            [drawerOpen]: open,
            [drawerClose]: !open,
          },
          paper,
        ),
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
        <p
          className="f-regular
           pb2"
        >
          고객사
        </p>
        <SearchBar
          size="small"
          data={usersList}
          searchingProp="companyName"
          handleSuggestionSelected={() => {}}
          handleResetSearch={() => {}}
        />
      </div>
      <Divider />
      <DeliveryDrawerBoard
        open={open}
        usersList={usersList}
        selectedSearchItem={selectedSearchItem}
      />
    </Drawer>
  );
};

export default withStyles(styles)(DeliveryDrawer);
