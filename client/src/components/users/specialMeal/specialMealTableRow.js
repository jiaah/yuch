import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
  // func
  formatToDateForm,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const onfocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  useEffect(
    () => () => {
      offFocusOnSelectdRow();
    },
    [],
  );

  const formattedDate = formatToDateForm(row.date);
  return (
    <TableRow
      key={row.id}
      onClick={() => onfocusOnSelectdRow(row.id)}
      role="checkbox"
      aria-checked={selectedRow === row.id}
      tabIndex={-1}
      selected={selectedRow === row.id}
    >
      <TableCell padding="checkbox" />
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
    </TableRow>
  );
};

export default withStyles(styles)(SpecialMealTableRow);
