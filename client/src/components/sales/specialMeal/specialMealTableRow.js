import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
});

const SpecialMealTableRow = ({
  classes: { resize },
  row,
  labelId,
  // local state
  selectedRow,
  // global state
  selectedItemValue,
  // func
  handleTableRowClick,
  handleEditBtnClick,
  handleDeleteBtnClick,
  formatToDateForm,
}) => {
  const formattedDate = formatToDateForm(row.date);
  const payment = row.userId ? 'YES' : '';

  return (
    <TableRow
      key={row.id}
      onClick={() => handleTableRowClick(row.id)}
      role="checkbox"
      aria-checked={selectedRow === row.id}
      tabIndex={-1}
      selected={
        selectedItemValue === row.companyName ||
        selectedItemValue === row.id ||
        selectedRow === row.id
      }
    >
      <TableCell padding="checkbox">
        <div className="flex flex-row-m" data-testid="bank-account--tablerow">
          <IconButton
            name="edit"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            handleClick={() => handleEditBtnClick(row.id)}
          />
          <IconButton
            name="delete"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            handleClick={() => handleDeleteBtnClick(row.id)}
          />
        </div>
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" className={resize}>
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
      <TableCell align="right" className={resize}>
        {payment}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(SpecialMealTableRow);
