import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
/* --- Components --- */
import IconButton from '../../../shared/iconButton';

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
  bankAccountInfo,
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
        {row.mealPrice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.lunchQty}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.dinnerQty}
      </TableCell>
      <TableCell align="right" className={resize}>
        {bankAccountInfo}
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export default withStyles(styles)(UserTableRow);
