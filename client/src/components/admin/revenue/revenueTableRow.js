import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import { formatNumber } from '../../../utils/reformat';

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
  onfocusOnSelectdRow,
}) => {
  const formattedDate = revenueFormat(row.date);
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
        {row.sumTotalInvoice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.sumTotalSpecialMeal}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.sumTotalResto}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formattedSumTotal}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(RevenueTableRow);
