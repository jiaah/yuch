import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
import { thisMonth } from '../../../helpers/moment';
import { formatWithSlash } from '../../../utils/date';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
  point: { fontWeight: 'bold' },
});

const UserTableRow = ({
  classes: { resize, point },
  handleTableRowClick,
  handleEditUserBtnClick,
  row,
  selected,
  labelId,
  selectedSearchItem,
}) => {
  let bankAccount;

  if (row.bankAccount) {
    const { accountHolder, bankName, accountNo } = row.bankAccount;
    bankAccount = { accountHolder, bankName, accountNo: accountNo.slice(0, 8) };
  } else {
    bankAccount = { accountHolder: '', bankName: '', accountNo: '' };
  }

  // translate businessType value to Korean
  const businessType =
    row.businessType === 'catering'
      ? '위탁'
      : row.businessType === 'restaurant'
        ? '식당'
        : null;

  // display new mealPrice if reserveDate is thisMonth.
  const newMealPrice =
    row.reserveDate === thisMonth ? row.reservePrice : row.mealPrice;
  const formattedDate = row.endDate && formatWithSlash(row.endDate);

  return (
    <React.Fragment>
      <TableRow
        key={row.id}
        role="checkbox"
        tabIndex={-1}
        aria-checked={selected === row.id}
        selected={selected === row.id || selectedSearchItem === row.id}
        onClick={() => handleTableRowClick(row.id)}
      >
        <TableCell padding="checkbox">
          <IconButton
            name="edit"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            handleClick={e => handleEditUserBtnClick(e, row.id)}
          />
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          className={`${resize} ${point}`}
        >
          {row.companyName}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.username}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.contactNo}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.email}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.lunchQty}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.dinnerQty}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.lateNightSnackQty}
        </TableCell>
        <TableCell align="right" className={resize}>
          {newMealPrice}
        </TableCell>
        <TableCell align="right" className={resize}>
          {bankAccount.accountHolder}
          &#8201;&#8201;&#8201;
          {bankAccount.bankName}
          &#8201;&#8201;&#8201;
          {bankAccount.accountNo}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.address}
        </TableCell>
        <TableCell align="right" className={resize}>
          {businessType}
        </TableCell>
        <TableCell align="right" className={resize}>
          {formattedDate}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserTableRow);
