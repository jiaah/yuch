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

const UserTableRow = ({
  classes: { resize },
  handleTableRowClick,
  handleEditUserBtnClick,
  row,
  selected,
  bankAccount,
  labelId,
}) => {
  const emptyAccount = [{ accountHolder: '', bankName: '', accountNo: '' }];
  let bankAccountInfo;

  if (bankAccount.length !== 0) {
    bankAccountInfo = bankAccount.filter(b => b.id === row.bankAccountId);
    // when admin deletes a bank account from bank_account table
    // => no matching bank account => display empty string
    if (bankAccountInfo.length === 0) bankAccountInfo = emptyAccount;
  } else if (bankAccount.length === 0) {
    bankAccountInfo = emptyAccount;
  }

  const { accountHolder, bankName, accountNo } = bankAccountInfo[0];
  // shorten bank account number
  const slicedAccountNo = accountNo.slice(0, 8);
  // translate businessType value to Korean
  const businessType =
    row.businessType === 'catering'
      ? '위탁'
      : row.businessType === 'restaurant'
        ? '식당'
        : null;
  // display reservePrice if it exists.
  const reservePriceView =
    row.reservePrice === null ? '' : `[${row.reservePrice}]`;
  return (
    <React.Fragment>
      <TableRow
        key={row.id}
        hover
        role="checkbox"
        tabIndex={-1}
        aria-checked={selected === row.id}
        selected={selected === row.id}
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
          className={resize}
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
          {row.mealPrice}
          {reservePriceView}
        </TableCell>
        {/* <TableCell align="right" className={resize}>
          {reservePriceView}
        </TableCell> */}
        <TableCell align="right" className={resize}>
          {accountHolder}
          &#8201;&#8201;&#8201;
          {bankName}
          &#8201;&#8201;&#8201;
          {slicedAccountNo}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.address}
        </TableCell>
        <TableCell align="right" className={resize}>
          {businessType}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserTableRow);
