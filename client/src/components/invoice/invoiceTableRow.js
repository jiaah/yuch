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
  font: { fontWeight: 'bold' },
  pointSun: { color: '#E8716F' },
  pointSat: { color: '#2196F3' },
});

const InvoiceTableRow = ({
  classes: { resize, pointSun, pointSat, font },
  row,
  mealPrice,
  formatNumber,
  invoiceFormat,
}) => {
  const totalQty = row.lunchQty + row.dinnerQty + row.lateNightSnackQty;
  const total = totalQty * mealPrice;

  const formattedMealPrice = formatNumber(mealPrice);
  const { date, day } = invoiceFormat(row.date);
  const isWeekend = day === 'Sat' ? pointSat : day === 'Sun' ? pointSun : null;

  return (
    <TableRow tabIndex={-1}>
      <TableCell align="right" className={`${resize} ${isWeekend} ${font}`}>
        {date}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.lunchQty || ''}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.dinnerQty || ''}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.lateNightSnackQty || ''}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formattedMealPrice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {total}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(InvoiceTableRow);
