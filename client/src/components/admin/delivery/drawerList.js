import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const DrawerList = ({
  unassignedUsers,
  selectedSearchItem,
  listItemA,
  hideText,
}) => {
  // display searched data
  const filtered =
    unassignedUsers &&
    unassignedUsers.filter(u => u.companyName === selectedSearchItem);
  const data = selectedSearchItem ? filtered : unassignedUsers;

  return (
    <List>
      {data &&
        data.map(u => (
          <ListItem key={u.id}>
            <p className={`${listItemA} fw3 c-text2`}>{u.companyName}</p>
            <p className={`${hideText} c-text-grey`}>{u.address}</p>
          </ListItem>
        ))}
    </List>
  );
};

export default DrawerList;
