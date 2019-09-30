import React, { useEffect, useState } from 'react';
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

const SpecialMealTableRow = ({ classes: { resize }, row }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const onfocusOnSelectdRow = id => setSelectedRow(id);
  const offFocusOnSelectdRow = () => setSelectedRow(null);

  useEffect(
    () => () => {
      offFocusOnSelectdRow();
    },
    [],
  );

  return (
    <TableRow
      key={row.id}
      onClick={() => onfocusOnSelectdRow(row.id)}
      role="checkbox"
      aria-checked={selectedRow === row.id}
      tabIndex={-1}
      selected={selectedRow === row.id}
    >
      <TableCell align="right" className={resize}>
        {row.companyName}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.mealPrice}
      </TableCell>
      <TableCell align="right" className={resize}>
        {row.sumTotal}
      </TableCell>
    </TableRow>
  );
};

export default withStyles(styles)(SpecialMealTableRow);
