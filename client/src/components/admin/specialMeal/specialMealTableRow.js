import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import { formatNumber } from '../../../utils/reformat';

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
  labelId,
  upComingEvent,
  // local state
  selectedRow,
  // global state
  clickedUserData,
  // func
  handleTableRowClick,
  handleEditBtnClick,
  handleDeleteBtnClick,
  formatToDateForm,
}) => {
  const { userId, companyName, date } = clickedUserData;

  const formattedDate = formatToDateForm(row.date);
  const formattedSumTotal = formatNumber(row.sumTotal);

  const payment = row.userId ? 'YES' : '';

  const isHandledRow =
    (userId && userId === row.userId) ||
    (companyName === row.companyName && date === row.date);
  const isUpcomingEvent = upComingEvent && upComingEvent.id === row.id;

  return (
    <TableRow
      key={row.id}
      onClick={() => handleTableRowClick(row.id)}
      role="checkbox"
      aria-checked={selectedRow === row.id}
      tabIndex={-1}
      selected={isUpcomingEvent || isHandledRow || selectedRow === row.id}
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
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        className={`${resize} ${point}`}
      >
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
        {formattedSumTotal}
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
