import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
    classes: { resize },
    list,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {list.map(row => (
          <TableCell
            key={`tr-${row.id}`}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            className={resize}
          >
            {row.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default withStyles(styles)(EnhancedTableHead);
