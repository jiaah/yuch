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

const BusinessNoTableRow = ({
  classes: { resize, point },
  row,
  selectedRow,
  selectedItemValue,
  handleTableRowClick,
}) => (
  <React.Fragment>
    <TableRow
      tabIndex={-1}
      aria-checked={selectedRow === row.companyName}
      selected={
        selectedItemValue === row.companyName || selectedRow === row.companyName
      }
      onClick={() => handleTableRowClick(row.companyName)}
    >
      <TableCell align="right" className={`${resize} ${point}`}>
        {row.companyName}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.businessNo}
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export default withStyles(styles)(BusinessNoTableRow);
