import React from 'react';
/* --- Components --- */
import List from './list';

const DeliveryDrawerBoard = ({
  // local state
  open,
  usersList,
  // global state
  selectedSearchItem,
}) => {
  // display searched data
  const filtered =
    usersList && usersList.filter(u => u.companyName === selectedSearchItem);
  const data = selectedSearchItem ? filtered : usersList;

  return <List data={data} open={open} />;
};

export default DeliveryDrawerBoard;
