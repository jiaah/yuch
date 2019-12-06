import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import DeliveryDrawerList from './deliveryDrawerList';

const DeliveryDrawer = ({
  classes: { paper, drawer, drawerOpen, drawerClose, toolbar },
  // global state
  selectedSearchItem,
  // local state
  routes,
  // actions
  getUsers,
}) => {
  const [usersList, setUsersList] = useState(null);
  const [open, setOpen] = React.useState(false);

  const fetchUsers = async () => {
    const res = await getUsers();
    // filter -> routes 테이블에 존재하지 않는 users
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
      <div className="flex flex-column-m items-center ph1">
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
      <DeliveryDrawerList
        open={open}
        usersList={usersList}
        selectedSearchItem={selectedSearchItem}
      />
    </Drawer>
  );
};

export default DeliveryDrawer;
