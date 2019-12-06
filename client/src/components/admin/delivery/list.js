import React from 'react';
import UIList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

const LightToolTip = withStyles(theme => ({
  tooltip: {
    // backgroundColor: theme.palette.common.white,
    // color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 15,
  },
}))(Tooltip);

const List = ({ data, open }) => (
  <UIList>
    {data &&
      data.length !== 0 &&
      data.map(u => (
        <ListItem key={u.id}>
          <LightToolTip
            title={u.address}
            placement="right"
            aria-label="showChart"
          >
            <Card className="delivery-card">
              <p className="fw3 c-text2">{u.companyName}</p>
            </Card>
          </LightToolTip>
          <p className={`ml4 ${clsx({ '': open, dn: !open })} c-text-grey`}>
            {u.address}
          </p>
        </ListItem>
      ))}
  </UIList>
);

export default List;
