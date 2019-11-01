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

const RevenueTableRow = ({
  classes: { resize, point },
  row,
  selectedRow,
  // func
  revenueFormat,
  formatNumber,
  onfocusOnSelectdRow,
}) => {
  const formattedDate = revenueFormat(row.date);
  const formattedInvoice = formatNumber(row.sumTotalInvoice);
  const formattedSpecialMeal = formatNumber(row.sumTotalSpecialMeal);
  const formattedResto = formatNumber(row.sumTotalResto);
  const formattedSumTotal = formatNumber(row.sumTotal);

  return (
    <TableRow
      onClick={() => onfocusOnSelectdRow(row.date)}
      role="checkbox"
      aria-checked={selectedRow === row.date}
      tabIndex={-1}
      selected={selectedRow === row.date}
    >
      <TableCell align="right" className={`${resize} ${point}`}>
        {formattedDate}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formattedInvoice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formattedSpecialMeal}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formattedResto}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formattedSumTotal}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(RevenueTableRow);
