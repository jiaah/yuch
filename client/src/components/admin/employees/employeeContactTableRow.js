import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
  point: { fontWeight: 'bold' },
});

const EmployeeTableRow = ({
  classes: { resize, point },
  row,
  // local state
  selectedRow,
  // global state
  selectedSearchItem,
  // funcs
  handleTableRowClick,
}) => (
  <TableRow
    key={row.id}
    onClick={() => handleTableRowClick(row.id)}
    tabIndex={-1}
    selected={selectedRow === row.id || selectedSearchItem === row.companyName}
  >
    <TableCell align="right" className={`${resize} ${point}`}>
      {row.companyName}
    </TableCell>
    <TableCell align="right" className={resize}>
      {row.contactNo}
    </TableCell>
  </TableRow>
);

export default withStyles(styles)(EmployeeTableRow);
