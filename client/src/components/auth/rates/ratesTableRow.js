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

const RatesTableRow = ({ classes: { resize }, row, labelId }) => (
  <React.Fragment>
    <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
      <TableCell padding="checkbox">
        <IconButton name="edit" width="19" height="19" viewBox="0 0 24 24" />
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
    </TableRow>
  </React.Fragment>
);

export default withStyles(styles)(RatesTableRow);
