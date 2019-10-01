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

const SpecialMealTableRow = ({
  classes: { resize, point },
  row,
  selectedRow,
  // func
  formatToDateForm,
  onfocusOnSelectdRow,
}) => {
  const formattedDate = formatToDateForm(row.date);
  return (
    <TableRow
      key={row.id}
      onClick={() => onfocusOnSelectdRow(row.id)}
      role="checkbox"
      aria-checked={selectedRow === row.id}
      tabIndex={-1}
      selected={selectedRow === row.id}
    >
      <TableCell align="right" className={`${resize} ${point}`}>
        {row.companyName}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formattedDate}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.time}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.sideDish}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.quantity}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.mealPrice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.sumTotal}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.address}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.contactNo}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.note}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(SpecialMealTableRow);
