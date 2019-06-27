import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '14px',
    },
  },
});

const EnhancedTableHead = props => {
  const {
    order,
    orderBy,
    onRequestSort,
    classes: { resize },
    list,
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {list.map(row => (
          <TableCell
            key={`tr-${row.id}`}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
            className={resize}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(EnhancedTableHead);
