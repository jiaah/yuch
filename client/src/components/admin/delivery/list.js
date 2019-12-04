import React from 'react';
import UIList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';

const List = ({ data, open }) => (
  <UIList>
    {data &&
      data.length !== 0 &&
      data.map(u => (
        <ListItem key={u.id}>
          <Card className="delivery-card">
            <p className="fw3 c-text2">{u.companyName}</p>
          </Card>
          <p className={`ml4 ${clsx({ '': open, dn: !open })} c-text-grey`}>
            {u.address}
          </p>
        </ListItem>
      ))}
  </UIList>
);

export default List;
