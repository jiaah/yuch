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
  font: { color: '#605E5E' },
  pointSun: { color: '#E8716F' },
  pointSat: { color: '#2196F3' },
});

const SpecialMealTableRow = ({
  classes: { resize, pointSun, pointSat, font },
  row,
  formatNumber,
  invoiceFormat,
}) => {
  const { mealPrice, quantity, time, sumTotal } = row;

  const lunchQty = time < '15 : 00' ? quantity : null;
  const dinnerQty = time >= '15 : 00' && time < '19 : 00' ? quantity : null;
  const lateNightSnackQty = time >= '19 : 00' ? quantity : null;

  const { date, day } = invoiceFormat(row.date);
  const isWeekend = day === 'Sat' ? pointSat : day === 'Sun' ? pointSun : null;

  return (
    <TableRow tabIndex={-1}>
      <TableCell align="right" className={`${resize} ${isWeekend} ${font}`}>
        {date}
      </TableCell>
      <TableCell align="right" className={resize}>
        {lunchQty}
      </TableCell>
      <TableCell align="right" className={resize}>
        {dinnerQty}
      </TableCell>
      <TableCell align="right" className={resize}>
        {lateNightSnackQty}
      </TableCell>
      <TableCell align="right" className={resize}>
        {formatNumber(mealPrice)}
      </TableCell>
      <TableCell align="right" className={resize}>
        {sumTotal}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(SpecialMealTableRow);
