import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import IconButton from '../../../shared/form/iconButton';
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
  selectedRow,
  labelId,
  clickedUserData,
}) => {
  let bankAccount;

  if (row.bankAccount) {
    const { accountHolder, bankName, accountNo } = row.bankAccount;
    bankAccount = { accountHolder, bankName, accountNo: accountNo.slice(0, 6) };
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

  const formattedStartDate = row.startDate && formatWithSlash(row.startDate);

  const formattedEndDate =
    row.endDate && row.endDate === '9999-12-31'
      ? null
      : formatWithSlash(row.endDate);

  return (
    <React.Fragment>
      <TableRow
        key={row.id}
        role="checkbox"
        tabIndex={-1}
        aria-checked={selectedRow === row.id}
        selected={
          selectedRow === row.id ||
          clickedUserData.companyName === row.companyName
        }
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
          <IconButton
            name="note"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            handleClick={e => handleEditUserBtnClick(e, row.id)}
          />
        </TableCell>
        <TableCell align="right" className={resize}>
          {bankAccount.accountHolder}
          &#8201;&#8201;&#8201;
          {bankAccount.accountNo}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.address}
        </TableCell>
        <TableCell align="right" className={resize}>
          {row.businessNo}
        </TableCell>
        <TableCell align="right" className={resize}>
          {businessType}
        </TableCell>
        <TableCell align="right" className={resize}>
          {formattedStartDate}
        </TableCell>
        <TableCell align="right" className={resize}>
          {formattedEndDate}
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default withStyles(styles)(UserTableRow);
