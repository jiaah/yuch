import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import IconButton from '../../shared/iconButton';

const styles = theme => ({
  resize: {
    [theme.breakpoints.up('md')]: {
      fontSize: '15.5px',
    },
  },
});

const BankTableRow = ({
  classes: { resize },
  handleTableRowClick,
  handleEditBankBtnClick,
  row,
  selected,
  labelId,
}) => (
  <React.Fragment>
    <TableRow
      key={row.id}
      hover
      onClick={() => handleTableRowClick(row.id)}
      role="checkbox"
      aria-checked={selected === row.id}
      tabIndex={-1}
      selected={selected === row.id}
    >
      <TableCell padding="checkbox">
        <IconButton
          name="edit"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          handleClick={e => handleEditBankBtnClick(e, row.id)}
        />
      </TableCell>
      <TableCell
        component="th"
        id={labelId}
        scope="row"
        padding="none"
        className={resize}
      >
        {row.accountHolder}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.bankName}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.accountNo}
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export default withStyles(styles)(BankTableRow);
