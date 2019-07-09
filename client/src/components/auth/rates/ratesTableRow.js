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
      key={row.id}
      hover
      role="checkbox"
      tabIndex={-1}
      aria-checked={selected === row.id}
      selected={selectedSearchItem === row.companyName || selected === row.id}
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
        {row.mealPrice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.reservedPrice.price}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.reservedPrice.date}
      </TableCell>
    </TableRow>
  </React.Fragment>
);

export default withStyles(styles)(RatesTableRow);
