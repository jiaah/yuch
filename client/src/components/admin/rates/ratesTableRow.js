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

const RatesTableRow = ({
  classes: { resize },
  row,
  labelId,
  selectedSearchItem,
  selected,
  handleTableRowClick,
  handleEditUserBtnClick,
}) => (
  <React.Fragment>
    <TableRow
      key={row.userId}
      hover
      role="checkbox"
      tabIndex={-1}
      aria-checked={selected === row.userId}
      selected={
        selectedSearchItem === row.companyName || selected === row.userId
      }
      onClick={() => handleTableRowClick(row.userId)}
    >
      <TableCell padding="checkbox">
        <IconButton
          name="edit"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          handleClick={e => handleEditUserBtnClick(e, row.userId)}
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
        {row.mealPrice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.reservePrice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.reserveDate}
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export default withStyles(styles)(RatesTableRow);
